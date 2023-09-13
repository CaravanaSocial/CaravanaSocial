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
      <div className=" w-[400px]">
        {" "}
        <img src={detail?.profilePicture} className="w-[300px] mt-2 mx-2" />
        <h1 className="font-vilaka font-bold text-[60px]">
          {detail?.nameCompany}
        </h1>
        <p className="font-vilaka text-light-1 font-bold text-[30px]">
          {detail?.description}
        </p>
        <p className="font-topmodern border-b-2 border-light-1 text-[25px]">
          Rubros de capacitación:
          {detail?.areaTrainings?.map((a) => {
            return (
              <div>
                <h1 className="font-vilaka text-light-1 font-bold text-[25px]">
                  {a.name}
                </h1>
              </div>
            );
          })}
        </p>
        <p className="font-vilaka font-bold  text-[30px]">
          {detail?.location?.country}, {detail?.location?.state},{" "}
          {detail?.location?.city}
        </p>
        <h2 className="font-topmodern  text-[25px]">
          Contacto:
          <span className="font-vilaka font-bold flex flex-col justify-center items-center text-[35px]">
            <HiOutlineMail size={30} /> {detail?.email}
            <AiOutlinePhone size={30} />
            {detail?.phone}
          </span>
        </h2>
      </div>
      <div className=" text-center w-full">
        <div>
          <h2 className="font-bold font-vilaka text-[50px]">Capacitaciones</h2>
          {companyIdRelacion ? (
            <div className=" flex flex-wrap ">
              {companyIdRelacion.map((t) => {
                return (
                  <div className=" mx-1 border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div className="font-topmodern">
                      {t.name}
                      <div className="flex justify-center">
                        <video
                          src={t.video[0]}
                          controls
                          width="200"
                          height="150"
                        ></video>
                      </div>
                      <NavLink to="/training/detail/:id">
                        <button className="border-2 mt-2 border-light-1 rounded p-1 font-topmodern hover:text-light-1">
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
        <div>
          {" "}
          <h2 className="font-vilaka font-bold text-[50px]">
            Ofertas de trabajo
          </h2>
          {companyIdRelOffer ? (
            <div className=" flex flex-wrap">
              {companyIdRelOffer.map((o) => {
                return (
                  <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div className="font-topmodern">
                      {o.title}
                      <br />
                      {o.description}
                    </div>
                    <NavLink to="/">
                      <button className="border-2 mt-2 border-light-1 rounded p-1 font-topmodern hover:text-light-1">
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
    </main>
  );
};

export default CompanyDetail;
