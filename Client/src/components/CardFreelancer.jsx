import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function CardFreelancer(props) {
  const { id } = props.freelancer;
  const imagen =
    "https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=2000";

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`/freelancer/${id}`);
  };

  return (
    <div className="flex-col  bg-light-1 hover:bg-light-2 dark:hover:bg-light-1 dark:bg-light-2  p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <img
        className="h-[380px] w-[450px] object-cover object-center rounded-full "
        src={props.freelancer.profilePicture}
      />
      <section>
        <h1 className="font-nunito font-bold dark:text-black text-[25px] sm:text-[30px]">
          {props.freelancer.name}
        </h1>

        <h3 className="font-nunito dark:text-black">
          {props.freelancer.location.country}
        </h3>
        <h4 className="font-nunito dark:text-black  whitespace-normal text-center  font-bold text-[20px]">
          {props.freelancer.description}
        </h4>
        <button
          onClick={() => navigate(`/freelancer/${id}`)}
          className=" mt-2 rounded-3xl font-nunito font-bold  bg-zinc-300 px-3 dark:font-light dark:text-white p-1 hover:scale-105 dark:bg-zinc-800 "
        >
          Ver perfil
        </button>
      </section>
    </div>
  );
}
