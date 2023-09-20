import TrainingCard from "./CardTrainings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getTrainings,
  filterTrainingBy,
  getCategories,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "../../../node_modules/react-icons/ai";

const Trainings = () => {
  const navigate = useNavigate();
  const trainingsFiltered = useSelector((state) => state.trainingsFiltered);
  const countries = useSelector((state) => state.countries);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const approvedTraininigs = trainingsFiltered?.filter(
    (x) => x.approved === true
  );
  const [filter, setFilter] = useState({
    country: "",
    category: "",
  });

  useEffect(() => {
    if (trainingsFiltered?.length) {
      return;
    }
    dispatch(getTrainings());
    dispatch(getCategories());
    dispatch(getCountry());
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountry());
    dispatch(filterTrainingBy(filter));
  }, [filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="m-4 p-4 h-full text-center items-center flex flex-col">
      {localStorage.length !== 0 ? (
        <>
          <div className="self-start">
            <button onClick={goBack} className="pb-3 pt-1 m-0 self-start">
              <AiOutlineArrowLeft
                className="bg-light-1 dark:bg-light-1 rounded-full p-1 dark:text-black"
                size={30}
              />
            </button>
          </div>
          <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl pt-2 px-3 shadow-md">
            <span className="font-nunito font-bold dark:font-light">
              Filtrar por :{" "}
            </span>
            <select
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              onChange={handleChange}
              name="country"
            >
              <option value="">Todos los Paises</option>
              {countries?.map((p) => {
                return (
                  <option key={p} value={p}>
                    {p}
                  </option>
                );
              })}
            </select>
            <span className="font-nunito font-bold dark:font-light">
              {" "}
              Filtrar por :
            </span>
            <select
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              onChange={handleChange}
              name="category"
            >
              <option value="">Todos los Rubros</option>
              {category?.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <h1 className="font-vilaka font-bold text-[50px] tracking-widest">
            Capacitaciones
          </h1>
          {trainingsFiltered?.length === 0 && (
            <div>
              No hay capacitaciones disponibles para este país o este rubro
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedTraininigs?.map((training) => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </div>
  );
};

export default Trainings;
