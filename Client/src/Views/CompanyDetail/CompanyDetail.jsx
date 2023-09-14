import React, { useEffect } from "react";
import {
  detailCompany,
  getTrainings,
  getOffers,
} from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import {HiOutlineLocationMarker} from "react-icons/hi";

const CompanyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.companyDetail);
  const trainings = useSelector((state) => state.trainings);
  const offers = useSelector((state) => state.offers);

  

  const companyIdRelacion = trainings.filter((x) => x.companyId === id);
  const companyIdRelOffer = offers.filter((x) => x.companyId === id);

  useEffect(() => {
    dispatch(detailCompany(id));
    dispatch(getOffers());
    dispatch(getTrainings());
  }, []);

  return (
    <main className="flex h-full ">
      <div className=" flex justify-center max-lg:flex-col max-lg:bg-light-1 max-lg:items-center dark:max-lg:bg-light-2">
      <div className=" w-[400px] pl-3 pr-3 bg-light-1 dark:bg-light-2">
        {" "}
        <img src={detail?.profilePicture} className="w-[300px] mt-2 mx-2 max-lg:m-auto rounded-full" />
        <h1 className="font-vilaka max-lg:text-center font-bold text-[60px]">
          {detail?.nameCompany}
        </h1>
        <p className="font-nunito font-semibold text-[25px] dark:font-medium">
          {detail?.description}
        </p>
        <p className="font-nunito font-bold dark:text-black border-b-2 text-center border-light-1 text-[17px] bg-light-2 dark:bg-light-1 rounded-3xl">
          Rubros de capacitación:
          {detail?.areaTrainings?.map((a) => {
            return (
              <div>
                <h1 className="font-nunito  text-white dark:text-black font-medium dark:font-bold text-[22px]">
                  {a.name}
                </h1>
              </div>
            );
          })}
        </p>
        <p className="font-nunito font-bold  flex flex-col justify-center text-center items-center text-[25px] dark:font-medium">
          <HiOutlineLocationMarker size={30}/>{detail?.location?.country}, {detail?.location?.state},{" "}
          {detail?.location?.city}
        </p>
       
          <span className="font-nunito font-bold flex flex-col justify-center items-center dark:font-medium text-[25px] mb-9">
            <HiOutlineMail size={30} /> {detail?.email}
            <AiOutlinePhone size={30} />
            {detail?.phone}
          </span>
        
      </div>
      <div className=" text-center w-full  ">
        <div>
          <h2 className="font-bold font-nunito text-[40px]">Capacitaciones</h2>
          {companyIdRelacion ? (
            <div className=" flex flex-wrap items-center justify-center ">
              {companyIdRelacion.map((t) => {
                return (
                  <div className=" m-1 border-2 border-light-1 hover:scale-95 bg-light-1 max-lg:bg-light-2 dark:bg-light-2 dark:max-lg:bg-light-1 p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div className="font-nunito text-xl dark:max-lg:text-black dark:max-lg:font-bold">
                      {t.name}
                      <div className="flex justify-center">
                        <video
                          src={t.video[0]}
                          controls
                          width="200"
                          height="150"
                        ></video>
                      </div>
                      <NavLink to={`/training/detail/${t.id}`}>
                        <button className="border-2 mt-2 bg-light-2 max-lg:bg-light-1 max-lg:border-light-1 dark:bg-light-1 dark:text-black border-light-2 dark:border-light-1 dark:max-lg:bg-light-2 rounded p-1 font-topmodern hover:text-light-1">
                          Ver detalle
                        </button>
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span className="font top-modern">
                No hay capacitaciones creadas todavia
              </span>
            </div>
          )}
        </div>
        <hr className="my-8 mx-4"/>
        <div>
          {" "}
          <h2 className="font-nunito font-bold text-[40px]">
            Ofertas de trabajo
          </h2>
          {companyIdRelOffer ? (
            <div className=" flex flex-wrap items-center justify-center">
              {companyIdRelOffer.map((o) => {
                return (
                  <div className="border-2 m-1 border-light-1 hover:scale-95  bg-light-1 max-lg:bg-light-2 dark:bg-light-2  dark:max-lg:bg-light-1 p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center text-xl ">
                    <div className="font-nunito dark:max-lg:text-black">
                      {o.title}
                      <br />
                      {o.description}
                    </div>
                    <NavLink to={`/home-offers/${o.title}`}>
                      <button className="border-2 mt-2 dark:text-black bg-light-2 border-light-2 max-lg:border-light-1 max-lg:bg-light-1 dark:border-light-1 dark:bg-light-1 rounded p-1 font-topmodern dark:max-lg:bg-light-2 hover:text-light-1">
                        Ver detalle
                      </button>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span className="font-topmodern">
                No hay ofertas de trabajo todavia
              </span>
            </div>
          )}
        </div>
      </div>
      </div>
    </main>
  );
};

export default CompanyDetail;
