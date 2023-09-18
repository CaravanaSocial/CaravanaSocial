import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import * as actions from "../../../Redux/Actions/Actions";

export default function DetailOffer() {
  const { title } = useParams();
  const dispatch = useDispatch();
  const offer = useSelector((state) => state.offer);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(actions.getOfferByName(title));
  }, []);


  const handleContact = () => {
    if (offer.adminId === null){
      window.location.href = `mailto:${offer.company.email}`;
    } else {
      window.location.href = `mailto:${"caravanasocial.dev@gmail.com"}`;
    }
  };
  const categories = offer?.areaTrainings?.map((x) => x.name).join(", ");


  return (
    <div className="h-full">
      {localStorage.length !== 0 ? (
        <div className="flex justify-center text-center">
          <div className="max-w-4xl justify-center text-center border-2 border-light-1 rounded-3xl p-2 m-4">
            <div className="flex justify-around items-center">
              <img

                className="w-52 max-lg:w-20 max-lg:h-20 rounded-full border-2 border-light-1"
                src={offer?.company?.profilePicture ? offer?.company?.profilePicture : offer?.admin?.profilePicture}
              />

              <div className="text-start">
                <h2 className="text-2xl max-lg:text-xl">
                  {offer?.company?.nameCompany}
                </h2>

                <h2 className="text-2xl max-lg:text-lg text-gray-700 dark:text-gray-400">
                  {offer?.title}
                </h2>
              </div>
            </div>

            <div className="border-t-2 border-light-1 dark:border-light-1 my-4" />

            <div className="justify-center items-center">
              <h1 className="text-2xl max-lg:text-xl text-light-2 dark:text-light-1">
                Rubros:
              </h1>
              <h2 className="text-xl max-lg:text-lg">{categories}</h2>

              <h1 className="text-2xl max-lg:text-xl text-light-2 dark:text-light-1 mt-6">
                Descripción:
              </h1>
              <h2 className="text-xl max-lg:text-lg">{offer?.description}</h2>

              <div className="border-t-2 border-light-1 dark:border-light-1 my-4" />

              <div className="flex justify-center items-center">
                <button className="bg-light-1 text-black px-2 py-2 mr-1 rounded-3xl">
                  Aplicar
                </button>
                <button
                  className="bg-light-1 text-black px-2 py-2 ml-1 rounded-3xl"
                  onClick={handleContact}
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{navigate("/login")}</div>
      )}

    </div>
  );
}
