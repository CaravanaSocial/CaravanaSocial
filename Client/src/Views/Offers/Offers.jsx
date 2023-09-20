import OfferCard from "../../components/Offercard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getOffers,
  getCompanies,
  getCategories,
  filterOffer,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineArrowLeft} from "../../../node_modules/react-icons/ai"

export default function Offer() {
  const navigate = useNavigate();
  const offers = useSelector((state) => state.offers);
  const countries = useSelector((state) => state.countries);
  const companies = useSelector((state) => state.companies);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    country: "",
    companyName: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getOffers());
    dispatch(getCountry());
    dispatch(getCompanies());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterOffer(filter));
    dispatch(getOffers());
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
    <div className="  first-letter:m-4 p-4 h-full items-center text-center flex flex-col ">
      {localStorage.length !== 0 ? (
        <>
        <div className="self-start">
        <button onClick={goBack}className="pb-3 pt-1 m-0 self-start" ><AiOutlineArrowLeft className="bg-light-1 dark:bg-light-1 rounded-full p-1"size={30}/></button>
        </div>
          <div className="border-2 justify-center text-center border-zinc-100 dark:border-zinc-800 rounded-3xl py-2 px-3 shadow-md">
          <span className="font-nunito font-bold">Filtrar por : </span>
            <select
              className="rounded-3xl px-2 mx-1 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              name="country"
              onChange={handleChange}
            >
              <option value="">Todos los paises</option>
              {countries?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="font-nunito font-bold">Filtrar por : </span>
            <select
              className="rounded-3xl px-2 mx-1 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              name="companyName"
              onChange={handleChange}
            >
              <option value="">Empresa</option>
              {companies?.map((c) => (
                <option key={c.name} value={c.nameCompany}>
                  {c.nameCompany}
                </option>
              ))}
            </select>
            <span className="font-nunito font-bold">Filtrar por : </span>
            <select
              className="rounded-3xl px-2 mx-1 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              name="category"
              onChange={handleChange}
            >
              <option value="">Categorias</option>
              {categories?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <h1 className="font-vilaka font-bold text-[50px]">Ofertas</h1>
          <div className="flex flex-wrap justify-center text-center">
            {offers?.length === 0 && (
              <div>
                No hay capacitaciones disponibles para esta busqueda, país o
                este rubro
              </div>
            )}
            {offers?.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </div>
  );
}
