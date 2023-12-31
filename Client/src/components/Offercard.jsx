import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ offer }) {
  return (
    <div className="flex-col  bg-light-1 hover:bg-light-2 dark:hover:bg-light-1 dark:bg-light-2 p-4 rounded-3xl shadow-md  w-[230px] h-[400px] flex justify-center sm:h-full items-center sm:w-[300px]  md:w-[300px] md:h-full ">
      <h2 className=" font-nunito font-bold dark:text-black whitespace-normal text-[25px]">
        {offer?.title}
      </h2>
      <p className="font-nunito font-bold  w-[250px] h-[40px] truncate dark:text-black text-center text-[16px] mb-4">
        {offer.description}
      </p>

      <div>
        {offer?.category?.map((c) => (
          <h2>{c}</h2>
        ))}
      </div>
      <div className="text-center justify-center flex">
        <img
          className="h-[280px] w-[400px] object-cover object-center rounded-full  md:h-[290px] md:w-[380px] sm:h-[290px] sm:w-[400px] "
          src={
            offer?.company?.profilePicture
              ? offer?.company?.profilePicture
              : offer?.admin?.profilePicture
          }
          alt=""
        />
      </div>
      <div>
        <Link to={`/home-offers/${offer?.title}`}>
          <button className=" mt-3 rounded-3xl font-nunito   font-bold  bg-zinc-300 px-3 dark:font-light dark:text-white p-1 hover:scale-105 dark:bg-zinc-800 ">
            Ver oferta
          </button>
        </Link>
      </div>
    </div>
  );
}
