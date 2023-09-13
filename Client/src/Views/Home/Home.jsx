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
  const approvedTraininigs = trainings.filter(x=>x.approved===true)

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

  const handleFrelancer = () => {
    navigate("/home-freelancers");
  };

  return (

    
    <main
      name="asdasd"
      className="2xl:flex  2xl:flex-row xl:flex xl:flex-row  lg:flex lg:flex-col  text-center  flex-col flex  2xl:w-full 2xl:h-full"
    >
      <div className=" border-r-2  2xl:w-[300px] xl:w-[300px] w-full">
        <h1 className=" sm:h-[300px] h-[150px] w-[300px] "></h1>
      </div>
      <div className="  md:flex md:flex-col md:items-center w-full ">
        <section className=" flex flex-col items-center">
          <h1 className="font-vilaka font-bold text-[50px]">Freelancers: </h1>
          <Slider>
            {freelancers?.map((item) => (
              <CardFreelancer key={item.id} freelancer={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleFrelancer()}
          className="font-topmodern border-2 my-5  hover:text-light-1  border-light-1 rounded p-1 "
        >
          Ver Mas
        </button>
        <section className=" flex flex-col items-center">
          <h1 className="font-vilaka font-bold text-[50px]">
            Capacitaciones:{" "}
          </h1>
          <Slider>
            {approvedTraininigs?.map((item) => (
              <TrainingCard key={item.id} training={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleCap()}
          className="font-topmodern border-2 my-5  hover:text-light-1 items-end  border-light-1 rounded p-1 "
        >
          Ver Mas
        </button>
        <section className=" flex flex-col items-center">
          <h1 className="font-vilaka font-bold text-[50px]">Ofertas: </h1>
          <Slider>
            {offers?.map((item) => (
              <OfferCard key={item.id} offer={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleOffer()}
          className="font-topmodern border-2 my-5  hover:text-light-1  border-light-1 rounded p-1 "
        >
          Ver Mas
        </button>
      </div>

    </main>
  );
};

export default Home;
