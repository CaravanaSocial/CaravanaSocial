import { Link } from "react-router-dom";
import video1 from "../assets/videos/video1.mp4";
import empresa1 from "../assets/images/empresa1.jpg";
import freelancer from "../assets/images/freelancer.jpg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SliderLanding from "../components/SliderLanding";
import { getSuccesCases } from "../Redux/Actions/Actions";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuccesCases());
  }, []);

  return (
    <main className=" relative">
      {/* SECCION INTRO */}
      <section className="w-full  2xl:h-[300px] relative ">
        <h1 className="text-center 2xl:text-[150px] xl:text-[130px] lg:text=[100px] md:text-[80px] font-vilaka text-[70px] ">
          Bienvenidos a Caravana Social
        </h1>
        <h1 className="text-center 2xl:text-[40px] xl:text-[30px] md:text-[20px] text-[20px] font-topmodern">
          Te invitamos a formar parte de la re-evolucion inclusiva!
        </h1>
      </section>
      {/* SECCION INTRO */}

      {/* SECCION CONOCENOS*/}
      <section className="w-full border-2 bg-light-1  p-2 text-center relative ">
        <h1 className="font-vilaka xl:text-[50px]  text-[40px] font-bold">
          ¡Conocenos!
        </h1>
        <video
          muted
          controls
          className="h-[500px] rounded  w-[1000px] object-cover m-auto"
        >
          <source src={video1} type="video/mp4" />
        </video>
      </section>

      {/* SECCION CONOCENOS*/}

      {/* SECCION NUESTRA FILOSOFIA */}

      <section className=" w-full  h-[500px] m-auto flex flex-col mt-5 lg:items-center lg:justify-center ">
        {" "}
        <h2 className="text-center font-vilaka xl:text-[50px] text-black text-[40px] font-bold   ">
          Nuestra Filosofia
        </h2>
        <div className="hover:skew-x-3 transition duration-500 text-center mt-5 mb-5 lg:w-[600px] lg:h-[300px] lg:m-5 m-auto  w-[400px] h-[400px]  rounded ">
          <h1 className="pt-5 px-5 lg:text-[30px] text-[25px] font-topmodern ">
            Capacitamos a personas con discapacidad, en situación abnegada y en
            recuperación de consumos problemáticos y ayudamos a las
            Organizaciones a integrarlas.La educación es el puente que une
            posibilidades y habilidades.
          </h1>
        </div>
      </section>
      {/* SECCION NUESTRA FILOSOFIA */}

      {/* SECCION CASOS DE EXITO */}
      <section className="w-full bg-light-1 border-2 ">
        <h1 className="font-vilaka  text-[50px] text-center font-bold ">
          ¡Echale un vistazo a nuestros casos de exito!
        </h1>
        <SliderLanding />
      </section>

      {/* SECCION CASOS DE EXITO */}

      {/* SECCION UNETE */}

      <section className="w-full text-center  lg:gap-x-20 md:flex md:justify-center   ">
        <Link
          to="/register-company"
          className="text-[40px] w-[400px] m-auto text-black  px-5 py-5  flex flex-col items-center font-topmodern   "
        >
          <img className="rounded h-[350px]" src={empresa1} width={400}></img>
          Soy empresa quiero unirme...
        </Link>

        <Link
          to="/register-user"
          className="text-[40px] px-5 py-5 w-[400px] text-black m-auto  text-center flex flex-col items-center font-topmodern  "
        >
          <img className="rounded h-[350px]" src={freelancer} width={400}></img>
          Soy Freelancer quiero unirme...
        </Link>
      </section>

      {/* SECCION UNETE */}

      {/* FOOTER */}
    </main>
  );
};

export default LandingPage;
