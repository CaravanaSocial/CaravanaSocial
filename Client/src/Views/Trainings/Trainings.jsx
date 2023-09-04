import TrainingCard from "./CardTrainings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getTraining,
  filterTrainingBy,
  getCategories,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";

const Trainings = () => {
  const trainings = useSelector((state) => state.trainings);
  const trainingFiltered = useSelector((state) => state.trainingFiltered);
  const countries = useSelector((state) => state.countries);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    country: "",
    category: "",
  });

  useEffect(() => {
    if (trainingFiltered.length) {
      return;
    }
    dispatch(getTraining());
    dispatch(getCategories());
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    dispatch(filterTrainingBy(filter));
  }, [filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="p-7 ">
      <div>
        <span>Filtrar por : </span>
        <select
          className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          onChange={handleChange}
          name="country"
        >
          <option value="Todos">Todos los Paises</option>
          {countries.map((p) => {
            return (
              <option key={p} value={p}>
                {p}
              </option>
            );
          })}
        </select>
        <span> Filtrar por :</span>
        <select
          className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          onChange={handleChange}
          name="category"
        >
          <option value="default">Todos los Rubros</option>
          {category?.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
      <h1>Entrenamientos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingFiltered.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
};

export default Trainings;
