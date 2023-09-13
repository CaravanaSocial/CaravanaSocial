import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  
  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[370px] sm:h-full sm:w-[400px] justify-center">
      <h2 className="text-lg font-topmodern">{offer.title}</h2>
      <p className="text-gray-600 font-topmodern">{offer.description}</p>
      <div>
        {offer.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <Link className="font-topmodern" to={`/home-offers/${offer.title}`}>
        Ver oferta
      </Link>
    </div>
  );
}
