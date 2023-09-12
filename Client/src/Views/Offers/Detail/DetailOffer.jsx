import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
import * as actions from "../../../Redux/Actions/Actions";

export default function DetailOffer() {
  const { title } = useParams();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer);

  React.useEffect(() => {
    dispatch(actions.getOfferByName(title));
  }, []);

  const handleAppy = () => {

  }

  const handleContact = () => {
    window.location.href = `mailto:${offer.company.email}`;
  }

  console.log(offer)

  return (
    <div className="bg-gray-100 h-full p-4">
      {/* Main contenedor */}
      <div className="flex">
        {/* Div izquierdo */}
        <div className="w-2/4 flex justify-center items-center">
          <div className="w-2/4 flex flex-col justify-end items-center">
            <div
              className="bg-white rounded-lg p-4 shadow-md text-center"
              style={{ width: "300px" }}
            >
              <h1 className="w-full rounded-t-lg text-3xl font-bold">
                {offer?.company?.nameCompany}
              </h1>
              <img
                    src= {offer?.company?.profilePicture}
                    alt="profile picture company"
                    className="w-full h-48 object-cover rounded-t-lg"
                />
              <h2 className="text-2xl font-semibold mt-2">{offer?.title}</h2>
              <p className="text-gray-600">{offer?.description}</p>
            </div>
            <div className="mt-4 text-center">

              {offer.areaTrainings.map(x=>{return <span className="inline-block bg-green-500 text-white px-2 py-1 m-2 rounded-full mr-2 text-center">{x.name}</span> })}

            </div>
          </div>
        </div>
        {/* Div derecho */}
        <div className="w-1/5 flex justify-center items-center">
          <div className="text-left">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 block">
              Aplicar
            </button>
            <button onClick={handleContact} className="bg-green-500 text-white px-4 py-2 rounded-lg block">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
