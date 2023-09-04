import OfferCard from "../../components/Offercard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getCountry,
  getOffer,
  getCompanies,
  getCategories,
  filterOffer,
} from "../../Redux/Actions/Actions";
import { useEffect, useState } from "react";

export default function Offer() {
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
    dispatch(getOffer());
    dispatch(getCountry());
    dispatch(getCompanies());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterOffer(filter));
  }, [filter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="inline-block m-4 p-4">
      <div className="border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl pt-2">
        <select className="mx-2 rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          name="country"
          onChange={handleChange}>
          <option value="">Pais</option>
          {countries?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="mx-2 rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          name="companyName"
          onChange={handleChange}>
          <option value="">Empresa</option>
          {companies?.map((c) => (
            <option key={c.name} value={c.nameCompany}>
              {c.nameCompany}
            </option>
          ))}
        </select>
        <select className="mx-2 rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          name="category"
          onChange={handleChange}>
          <option value="">Categorias</option>
          {categories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <h1>Ofertas</h1>
      <div className="flex flex-wrap items-center">
        {offers?.map((offer) => (
          <OfferCard className="mx-4"
            key={offer.id}
            offer={offer} />
        ))}
      </div>
    </div>
  );
}
