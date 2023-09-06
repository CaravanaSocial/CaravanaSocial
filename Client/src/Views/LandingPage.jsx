import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import video1 from "../assets/videos/video1.mp4";

const LandingPage = () => {
  const slides = [
    {
      url: "https://previews.123rf.com/images/javiindy/javiindy1302/javiindy130200056/17658119-retrato-de-un-hombre-joven-y-guapo-modelo-de-moda-con-tup%C3%A9-en-un-parque.jpg",
    },
    {
      url: "https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-asiatica-descansando-cerca-arbol-relajandose-parque-sonriendo-luciendo-feliz_1258-124780.jpg?w=2000",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj90ixQPf8oNltvgzmzJGyZQDtN1q9IF3E5Q&usqp=CAU",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };
  const previousSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <main className="relative">
      {/* SECCION INTRO */}
      <section className="w-full 2xl:h-[300px] relative ">
        <h1 className="text-center 2xl:text-[150px] xl:text-[130px] lg:text=[100px] md:text-[80px] font-vilaka text-[70px] ">
          Bienvenidos a Caravana Social
        </h1>
        <h1 className="text-center 2xl:text-[40px] xl:text-[30px] md:text-[20px] text-[20px] font-topmodern">
          Te invitamos a formar parte de la re-evolucion inclusiva!
        </h1>
      </section>
      {/* SECCION INTRO */}

      {/* SECCION CONOCENOS*/}
      <section className="w-full border-2 text-center relative ">
        <h1 className="font-vilaka xl:text-[50px]  text-[40px] font-bold">
          Conocenos!!
        </h1>
        <video
          muted
          controls
          className="h-[500px] w-[1000px] object-cover m-auto"
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
      <section className="w-full border-2 bg-light-1">
        <h1 className="font-vilaka text-[50px] font-bold ">
          Hechale un vistazo a nuestros casos de exito!!
        </h1>
        <div className="max-w-[1000px] h-[600px] w-full m-auto py-16 px-4 relative group">
          <div
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
            className="w-full h-full rounded-2xl bg-cover duration-500"
          ></div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2x1 rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={previousSlide} size={30} />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2x1 rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-xl cursor-pointer"
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCION CASOS DE EXITO */}

      {/* SECCION UNETE */}

      <section className="w-full lg:gap-x-20 md:flex md:justify-center   ">
        <Link
          to="/register-company"
          className="text-[40px] w-[400px] m-auto text-black  px-5 py-5  flex flex-col items-center font-topmodern   "
        >
          <img
            className="rounded h-[400px"
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-empresa_114360-2581.jpg"
            width={400}
          ></img>
          Soy empresa quiero unirme...
        </Link>

        <Link
          to="/register-user"
          className="text-[40px] px-5 py-5 w-[400px] text-black m-auto  text-center flex flex-col items-center font-topmodern  "
        >
          <img
            className="rounded h-[350px]"
            src="https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2018/11/Why-it%E2%80%99s-Awesome-to-be-a-Freelancer-1.png"
            width={400}
          ></img>
          Soy Freelancer quiero unirme...
        </Link>
      </section>

      {/* SECCION UNETE */}

      {/* FOOTER */}
    </main>
  );
};

export default LandingPage;
