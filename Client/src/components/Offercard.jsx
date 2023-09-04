import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">{offer.title}</h2>
      <p className="text-gray-600">{offer.description}</p>
      <div>
        {offer.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <Link to={``}>Ver oferta</Link>
    </div>
  );
}
