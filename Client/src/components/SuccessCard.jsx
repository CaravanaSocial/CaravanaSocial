import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const SuccessCard = ({
  image,
  history,
  name,
  webpage,
  instagram,
  facebook,
}) => {
  return (
    <main className=" md:flex md:flex-row items-center text-center p-2 flex flex-col justify-center gap-11 ">
      <div>
        <img
          src={image}
          alt=""
          className="max-w-[500px] max-h-[500px] border-2 border-light-2 rounded-full max-lg:w-[370px] max-lg:h-[370px]"
        ></img>
      </div>
      <div className="w-[300px] ">
        <h1 className="font-vilaka text-center text-[50px] font-bold dark:text-black">
          {name}
        </h1>
        <h1 className="font-topmodern text-[20px] dark:text-black">{history}</h1>
        {webpage ? (
          <Link target="_blank" to={webpage}>
            <span className=" hover:text-white flex dark:text-black">
              <AiOutlineLink size={20} className="dark:text-black"/>
              <h2 className="dark:text-black">Pagina Web </h2>: {webpage}
            </span>
            <br />
          </Link>
        ) : null}
        <div className="flex gap-5 justify-center dark:text-black">
          {facebook ? (
            <Link target="_blank" to={facebook}>
              <FaFacebook size={30} />
            </Link>
          ) : null}
          {instagram ? (
            <Link target="_blank" to={instagram}>
              <BsInstagram size={30} />
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default SuccessCard;
