import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (

    <div className="m-2 text-ellipsis flex-col bg-light-1 dark:bg-light-2 hover:bg-light-2   p-4 rounded-3xl shadow-md w-96 flex justify-center dark:hover:bg-light-1">
      <h2 className=" font-nunito font-bold dark:text-black whitespace-normal text-[25px]">
        {offer?.title}

      </h2>
      <p className="font-nunito font-bold whitespace-normal dark:text-black text-center text-[16px] mb-4">
        {offer.description}
      </p>
      <div>
        {offer?.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <div className="text-center justify-center flex">
        <img className="h-[350px] w-[450px] object-cover object-center rounded-full  " src={offer?.company?.profilePicture} alt="" />
      </div>
      <div>
      <Link
        to={`/home-offers/${offer?.title}`}
      ><button className=" mt-3 rounded-3xl font-nunito   font-bold  bg-zinc-300 px-3 dark:font-light dark:text-white p-1 hover:scale-105 dark:bg-zinc-800 ">
        Ver oferta
      </button></Link>
      </div>

    </div>
  );
}
