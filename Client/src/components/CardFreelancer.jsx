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
    <div className="border-2 flex-col border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[370px] sm:h-full sm:w-[400px] flex justify-center">
      <img
        className="h-[400px] rounded-[666px] "
        src={props.freelancer.profilePicture}
      />
      <section>
        <h1 className="font-topmodern">{props.freelancer.name}</h1>

        <h3 className="font-topmodern">{props.freelancer.location.country}</h3>
        <h4 className="font-topmodern">{props.freelancer.description}</h4>
        <button
          onClick={() => navigate(`/freelancer/${id}`)}
          className="border-2 rounded-lg font-topmodern border-light-1 hover:text-light-1 p-1"
        >
          Ver Perfil
        </button>
      </section>
    </div>
  );
}
