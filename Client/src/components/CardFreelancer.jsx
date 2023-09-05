import { Link } from "react-router-dom";

export default function CardFreelancer(props) {
  const imagen =
    "https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=2000";
  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[400px] flex justify-center">
      <Link>
        <img className="h-[400px] rounded-[666px] " src={imagen} />
        <section>
          <h1 className="font-topmodern">{props.name}</h1>

          <h3 className="font-topmodern">{props.location.country}</h3>
          <h4 className="font-topmodern">{props.description}</h4>
        </section>
      </Link>
    </div>
  );
}
