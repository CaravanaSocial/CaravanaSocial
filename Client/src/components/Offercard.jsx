import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  
  return (
    <div className="border-2 text-ellipsis flex-col border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <h2 className=" font-topmodern whitespace-normal text-[25px]">
        {offer.title}
      </h2>
      <p className="font-vilaka whitespace-normal text-center font-bold text-[25px]">
        {offer.description}
      </p>
      <div>
        {offer.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <Link
        className="border-2 rounded-lg font-topmodern bg-light-1 hover:text-white w-[100px] self-center p-1"
        to={`/home-offers/${offer.title}`}
      >
        Ver oferta
      </Link>
    </div>
  );
}
