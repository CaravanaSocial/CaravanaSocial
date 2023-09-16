import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <div className="border-2 text-ellipsis flex-col border-light-1 hover:scale-95 dark:bg-light-1 bg-white p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <h2 className=" font-topmodern dark:text-black whitespace-normal text-[25px]">
        {offer?.title}
      </h2>
      <p className="font-nunito whitespace-normal dark:text-black text-center font-bold text-[20px]">
        {offer.description}
      </p>
      <div>
        {offer?.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <Link
        className="border-2 rounded-lg font-topmodern  bg-light-1  dark:text-black p-1 hover:scale-105 dark:border-black w-[100px] m-auto"
        to={`/home-offers/${offer?.title}`}
      >
        Ver oferta
      </Link>
    </div>
  );
}
