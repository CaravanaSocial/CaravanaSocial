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
    <div className="border-2  flex-col border-light-1 hover:scale-95 dark:bg-light-1 bg-white p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <img
        className="h-[400px]  rounded-[666px] "
        src={props.freelancer.profilePicture}
      />
      <section>
        <h1 className="font-topmodern dark:text-black text-[25px] sm:text-[30px]">
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
          className="border-2 rounded-lg font-topmodern  bg-light-1  dark:text-black p-1 hover:scale-105 dark:border-black"
        >
          Ver Perfil
        </button>
      </section>
    </div>
  );
}
