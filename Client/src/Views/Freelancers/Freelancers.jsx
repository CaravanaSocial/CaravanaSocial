import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getCategories,
  getFilterFreelancers,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import CardFreelancer from "../../components/CardFreelancer";
import { useNavigate } from "react-router-dom";
import {AiOutlineArrowLeft} from "../../../node_modules/react-icons/ai"

const Freelancers = () => {
  const freelancers = useSelector((state) => state.filteredFreelancers);
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries);
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    country: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    dispatch(getFilterFreelancers(filter));
  }, [filter]);

  const goBack=()=>{
    navigate(-1)
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className=" p-4 h-full items-center text-center flex flex-col ">
      {localStorage.length !== 0 ? (
        <>
        <div className="self-start">
        <button onClick={goBack}className="pb-3 pt-1 m-0 self-start" ><AiOutlineArrowLeft className="bg-light-1 dark:bg-light-1 rounded-full p-1 dark:text-black"size={30}/></button>
        </div>
          <div className=" max-lg:border-none max-lg:shadow-none border-spacing-96 border-2 border-zinc-300 dark:border-zinc-800 rounded-3xl py-2 px-3 shadow-md">
            <span className="font-nunito font-bold dark:font-light max-lg:hidden mr-1">Filtrar por : </span>
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
            <span className="font-nunito font-bold dark:font-light max-lg:hidden mr-1"> Filtrar por :</span>
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
          <h1 className="font-vilaka font-bold text-[50px] tracking-widest ">Freelancers</h1>
         
          <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-10 md:max-lg:grid-cols-2">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
            {freelancers?.length === 0 && (
              <div>
                No hay freelancers disponibles para este país o este rubro
              </div>
            )}
          </div>
        </>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </div>
  );
};

export default Freelancers;
