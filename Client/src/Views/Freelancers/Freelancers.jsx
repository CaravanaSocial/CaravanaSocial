import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getCategories,
  getFreelancers,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import CardFreelancer from "../../components/CardFreelancer";

const Freelancers = () => {
  const freelancers = useSelector((state) => state.freelancers);

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
    dispatch(getFreelancers());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="  first-letter:m-4 p-4 h-full items-center text-center flex flex-col ">
      <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl pt-2 shadow-md">
        <span className="font-topmodern">Filtrar por : </span>
        <select
          className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
          onChange={handleChange}
          name="country"
        >
          <option value="Todos">Todos los Paises</option>
          {countries?.map((p) => {
            return (
              <option key={p} value={p}>
                {p}
              </option>
            );
          })}
        </select>
        <span className="font-topmodern"> Filtrar por :</span>
        <select
          className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
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
      <h1 className="font-vilaka font-bold text-[50px]">Freelancers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {freelancers?.map((freelancer) => (
          <CardFreelancer key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>
    </div>
  );
};

export default Freelancers;
