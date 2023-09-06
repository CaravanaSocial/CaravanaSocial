import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  companyButtons,
  getFreelancers,
  getOffers,
  getTrainings,
} from "../../Redux/Actions/Actions";
import { useEffect } from "react";
import TrainingCard from "../Trainings/CardTrainings";
import OfferCard from "../../components/Offercard";
import CardFreelancer from "../../components/CardFreelancer";
import Slider from "../../components/Slider";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { trainings, offers, freelancers } = useSelector((state) => state);

  useEffect(() => {
    if (localStorage.type === "company") {
      dispatch(companyButtons(true));
    } else {
      dispatch(companyButtons(false));
    }
    dispatch(getTrainings());
    dispatch(getOffers());
    dispatch(getFreelancers());
  }, [dispatch]);

  const handleCap = () => {
    navigate("/home-trainings");
  };

  const handleOffer = () => {
    navigate("/home-offers");
  };

  return (
    <main className="">
      {localStorage.length !== 0 ? (
        <div className=" ">
          {" "}
          <div className="w-[300px] h-full bg-violet-500"></div>
          <div className=" w-full h-full">
            <section className="p-2">
              <div className="font-vilaka font-bold flex text-[40px]">
                FREELANCERS
              </div>

              <Slider>
                {freelancers.map((item) => (
                  <CardFreelancer
                    key={item.id}
                    name={item.name}
                    location={item.location}
                    description={item.description}
                  />
                ))}
              </Slider>
              <button
                onClick={() => handleOffer()}
                className="font-topmodern border-2  hover:text-light-1  border-light-1 rounded p-1 "
              >
                Ver Mas
              </button>
            </section>
            <section className="p-2">
              <div className="font-vilaka flex font-bold  text-[40px]">
                CAPACITACIONES RECIENTES
              </div>

              <Slider>
                {trainings.map((item) => (
                  <TrainingCard key={item.id} training={item} />
                ))}
              </Slider>
              <button
                onClick={() => handleCap()}
                className="font-topmodern border-2  self-end hover:text-light-1 items-end  border-light-1 rounded p-1 "
              >
                Ver Mas
              </button>
            </section>
            <section className="p-2">
              <div className="font-vilaka font-bold flex text-[40px]">
                OFERTAS RECIENTES
              </div>

              <Slider>
                {offers.map((item) => (
                  <OfferCard key={item.id} offer={item} />
                ))}
              </Slider>
              <button
                onClick={() => handleOffer()}
                className="font-topmodern border-2  hover:text-light-1  border-light-1 rounded p-1 "
              >
                Ver Mas
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div className="font-vilaka text-[50px] ">
          Debes ingresar primero para ver este contenido :)
        </div>
      )}
    </main>
  );
};

export default Home;
