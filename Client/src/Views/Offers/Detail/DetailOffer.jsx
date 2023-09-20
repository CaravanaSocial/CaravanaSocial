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
  console.log("esta es ofer", offer);

  React.useEffect(() => {
    dispatch(actions.getOfferByName(title));

    return () => dispatch(actions.clearVideos());
  }, []);

  const goBack =()=>{
    navigate(-1)
  }

  const handleContact = () => {
    if (offer[0]?.adminId === null) {
      window.location.href = `mailto:${offer[0]?.company.email}`;
    } else {
      window.location.href = `mailto:${"caravanasocial.dev@gmail.com"}`;
    }
  };
  const categories = offer[0]?.areaTrainings?.map((x) => x.name).join(", ");

  return (
    <div className="h-full">
      {localStorage.length !== 0 ? (
        <div className="flex justify-center text-center">
          <div className="max-w-4xl justify-center text-center border-2 border-light-1 rounded-3xl p-2 m-4">
            <div className="flex justify-around items-center">
              <img
                className="w-52 max-lg:w-20 max-lg:h-20 rounded-full border-2 border-light-1"
                src={
                  offer[0]?.company?.profilePicture
                    ? offer[0]?.company?.profilePicture
                    : offer[0]?.admin?.profilePicture
                }
              />

              <div className="text-start">
                <h2 className="text-2xl max-lg:text-xl">
                  {offer[0]?.company?.nameCompany}
                </h2>

                <h2 className="text-2xl max-lg:text-lg text-gray-700 dark:text-gray-400">
                  {offer[0]?.title}
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
              <h2 className="text-xl max-lg:text-lg">
                {offer[0]?.description}
              </h2>

              <div className="border-t-2 border-light-1 dark:border-light-1 my-4" />

              <div className="flex justify-center items-center">
                <button
                  className="bg-light-1 text-black px-2 py-2 rounded-3xl"
                  onClick={handleContact}
                >
                  Contactar
                </button>
              </div>
            </div>
            <button className="bg-light-1 font-topmodern rounded-3xl py-1 px-2 my-3 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95" onClick={goBack}>volver</button>
          </div>
        </div>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </div>
  );
}
