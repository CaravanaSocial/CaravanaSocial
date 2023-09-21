import { Link } from "react-router-dom";
import video1 from "../assets/videos/video1.mp4";
import empresa1 from "../assets/images/empresa1.jpg";
import freelancer from "../assets/images/freelancer.jpg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SliderLanding from "../components/SliderLanding";
import { getSuccesCases } from "../Redux/Actions/Actions";
import { useState } from "react";
import { useSelector } from "react-redux";

const video2 = "https://www.youtube.com/embed/Ysl6IijwSq0";

const LandingPage = () => {
  const speech = useSelector((state) => state.enableSpeech);
  const dispatch = useDispatch();
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    dispatch(getSuccesCases());
    setSynth(window.speechSynthesis);
  }, []);

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
    <main className="items-center h-full md:w-full w-[740px]">
      <section className="w-full  2xl:h-[300px]  ">
        <h1
          onClick={() => speakText("Bienvenidos a Caravana Social")}
          onMouseLeave={() => {
            cancelVoice;
          }}
          className="text-center  2xl:text-[150px] xl:text-[130px] lg:text=[100px] md:text-[80px] font-vilaka text-[70px] "
        >
          Bienvenidos a Caravana Social
        </h1>
        <h1
          onClick={() =>
            speakText(
              "Te invitamos a formar parte de la re-evolucion inclusiva"
            )
          }
          onMouseLeave={() => cancelVoice}
          className="text-center 2xl:text-[45px] xl:text-[30px] md:text-[20px] text-[20px] font-nunito font-bold dark:font-light"
        >
          Te invitamos a formar parte de la re-evolucion inclusiva!
        </h1>
      </section>
      {/* SECCION INTRO */}

      {/* SECCION CONOCENOS*/}
      <section className="w-full  bg-light-1  p-2 pb-16 text-center ">
        <h1
          onClick={() => speakText("Conócenos")}
          onMouseLeave={() => {}}
          className="font-nunito xl:text-[50px]  text-[40px] font-bold dark:text-black"
        >
          ¡Conócenos!
        </h1>
        <iframe
          src="https://www.youtube.com/embed/Ysl6IijwSq0"
          className="h-[250px] lg:h-[600px] rounded xl:w-[1200px] lg:w-[1100px] md:w-[700px] md:h-[500px] m-auto w-[380px]     "
        ></iframe>
      </section>

      {/* SECCION CONOCENOS*/}

      {/* SECCION NUESTRA FILOSOFIA */}

      <section className=" w-full  h-[500px] m-auto flex flex-col mt-5 lg:items-center lg:justify-center ">
        {" "}
        <h2
          onClick={() => speakText("Nuestra Filosofía")}
          onMouseLeave={() => {}}
          className="text-center font-nunito dark:text-white text-black text-[55px] font-bold dark:font-light cursor-default "
        >
          Nuestra filosofía
        </h2>
        <div className=" text-center mt-2 mb-5 lg:w-[600px] lg:h-[300px] lg:m-5 m-auto  w-[400px] h-[450px]  rounded ">
          <h1
            onClick={() =>
              speakText(
                "Capacitamos a personas con discapacidad, en situación abnegada y en recuperación de consumos problemáticos y ayudamos a las Organizaciones a integrarlas. La educación es el puente que une posibilidades y habilidades"
              )
            }
            onMouseLeave={() => {}}
            className="pt-1 px-5 lg:text-[30px] text-[25px] font-nunito font-bold cursor-default dark:font-light"
          >
            Capacitamos a personas con discapacidad, en situación abnegada y en
            recuperación de consumos problemáticos y ayudamos a las
            Organizaciones a integrarlas. La educación es el puente que une
            posibilidades y habilidades.
          </h1>
        </div>
      </section>
      {/* SECCION NUESTRA FILOSOFIA */}

      {/* SECCION CASOS DE EXITO */}
      <section className="w-full bg-light-1  ">
        <h1
          onClick={() => speakText("Dale un vistazo a nuestros casos de exito")}
          onMouseLeave={() => {}}
          className="font-vilaka max-lg:mx-2 max-lg:text-[40px] text-[50px] text-center font-bold dark:text-black"
        >
          ¡Dale un vistazo a nuestros casos de exito!
        </h1>
        <SliderLanding />
      </section>

      {/* SECCION CASOS DE EXITO */}

      {/* SECCION UNETE */}

      <section className="w-full  text-center items-center justify-center flex flex-col  lg:gap-x-20 md:flex md:flex-row md:justify-center   ">
        <Link
          to="/register-company"
          className="text-[30px] dark:text-white w-[400px] m-auto text-black  px-5 py-5  flex flex-col items-center font-nunito font-bold   "
        >
          <img className="rounded h-[350px]" src={empresa1} width={400}></img>
          <span
            onMouseEnter={() => speakText("Soy empresa quiero unirme")}
            onMouseLeave={() => {}}
          >
            Soy empresa quiero unirme
          </span>
          <button
            onMouseEnter={() => speakText("Registrarme")}
            className="bg-light-1 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
          >
            Registrarme
          </button>
        </Link>

        <Link
          to="/register-user"
          className="text-[30px] dark:text-white px-5 py-5 w-[400px] text-black m-auto  text-center flex flex-col items-center font-nunito font-bold "
        >
          <img className="rounded h-[350px]" src={freelancer} width={400}></img>
          <span
            onMouseEnter={() => speakText("Quiero capacitarme Soy freelancer")}
            onMouseLeave={() => {}}
          >
            Quiero capacitarme -
            <br />
            Soy freelancer
          </span>
          <button
            onMouseEnter={() => speakText("Registrarme")}
            className="bg-light-1 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
          >
            Registrarme
          </button>
        </Link>
      </section>

      {/* SECCION UNETE */}

      {/* FOOTER */}
    </main>
  );
};

export default LandingPage;
