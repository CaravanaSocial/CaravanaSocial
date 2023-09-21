import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  companyButtons,
  getFreelancers,
  getOffers,
  getTrainings,
} from "../../Redux/Actions/Actions";
import { useEffect, useState} from "react";
import TrainingCard from "../Trainings/CardTrainings";
import OfferCard from "../../components/Offercard";
import CardFreelancer from "../../components/CardFreelancer";
import Slider from "../../components/Slider";

const Home = () => {
  const speech = useSelector((state) => state.enableSpeech);
  const [synth, setSynth] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { trainings, offers, freelancers } = useSelector((state) => state);

  const approvedTraininigs = trainings?.filter(x=>x.approved===true)

  useEffect(() => {
    if (localStorage.type === "company") {
      dispatch(companyButtons(true));
    } else {
      dispatch(companyButtons(false));
    }
    dispatch(getTrainings());
    dispatch(getOffers());
    dispatch(getFreelancers());
    setSynth(window.speechSynthesis);
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

  const speakText = (text) => {
    if (speech === true && synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1;
      utterance.lang = "es-ES";
      synth.speak(utterance);
    }
  };
  const cancelVoice = () => {
    if (synth) {
      synth.cancel();
    }
  };

  return (
    <main
      name="asdasd"
      className="2xl:flex  2xl:flex-row xl:flex xl:flex-row  lg:flex lg:flex-col  text-center  flex-col flex  2xl:w-full 2xl:h-full"
    >
     
      <div className=" md:flex md:flex-col md:items-center w-full ">
        <div>
        <section className=" flex flex-col items-center ">
          <h1 className="font-vilaka font-bold tracking-widest text-[50px]"
          onClick={() => speakText("Freelancers")}
          onMouseLeave={() => {cancelVoice;}}>Freelancers </h1>
          <Slider>
            {freelancers?.map((item) => (
              <CardFreelancer key={item.id} freelancer={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleFrelancer()}
          className="font-nunito border-2 my-5 px-3 hover:bg-light-1 font-bold border-light-1 rounded-3xl p-1 dark:hover:text-black"
        >
          Ver más...
        </button>
        </div>
        <div>
        <section className=" flex flex-col items-center">
          <h1 className="font-vilaka font-bold tracking-widest text-[50px]"
          onClick={() => speakText("Capacitaciones")}
          onMouseLeave={() => {cancelVoice;}}
          >
            Capacitaciones{" "}
          </h1>
          <Slider>
            {approvedTraininigs?.map((item) => (
              <TrainingCard key={item.id} training={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleCap()}
          className="font-nunito border-2 my-5 px-3 hover:bg-light-1 font-bold dark:hover:text-black border-light-1 rounded-3xl p-1"
        >
          Ver más...
        </button>
        </div>
        <div>
        <section className=" flex flex-col items-center">
          <h1 className="font-vilaka font-bold tracking-widest text-[50px]"
          onClick={() => speakText("Ofertas")}
          onMouseLeave={() => {cancelVoice;}}>Ofertas </h1>
          <Slider>
            {offers?.map((item) => (
              <OfferCard key={item.id} offer={item} />
            ))}
          </Slider>
        </section>
        <button
          onClick={() => handleOffer()}
          className="font-nunito border-2 my-5 px-3 hover:bg-light-1 font-bold dark:hover:text-black border-light-1 rounded-3xl p-1 "
        >
          Ver más...
        </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
