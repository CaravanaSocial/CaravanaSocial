import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
import * as actions from "../../../Redux/Actions/Actions";

export default function DetailOffer() {
  const { title } = useParams();
  const dispatch = useDispatch();
  const oferta = useSelector((state) => state.offer);

  React.useEffect(() => {
    dispatch(actions.getOfferByName(title));
  }, []);

  console.log(oferta);

  return (
    <div className="bg-gray-100 h-full p-4">
      {/* Main contenedor */}
      <div className="flex">
        {/* Div izquierdo */}
        <div className="w-2/4 flex justify-end items-center">
          <div
            className="bg-white rounded-lg p-4 shadow-md text-center"
            style={{ width: "300px" }}
          >
            <h1 className="w-full h-48 object-cover rounded-t-lg">
              {oferta?.company?.nameCompany}
            </h1>
            {/* <img
                    src="ruta-de-tu-imagen.jpg"
                    alt="Imagen de la oferta laboral"
                    className="w-full h-48 object-cover rounded-t-lg"
                /> */}
            <h2 className="text-2xl font-semibold mt-2">{oferta?.title}</h2>
            <p className="text-gray-600">{oferta?.description}</p>
          </div>
        </div>
        {/* Div derecho */}
        <div className="w-1/5 flex justify-center items-center">
          <div className="text-left">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 block">
              Aplicar
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg block">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
