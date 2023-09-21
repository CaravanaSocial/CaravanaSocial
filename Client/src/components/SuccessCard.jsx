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
          width={600}
          src={image}
          alt=""
          className=" mb-10 border-2 border-light-2 rounded "
        ></img>
      </div>
      <div className="w-[300px]  ">
        <h1 className="font-vilaka text-center text-[50px] font-bold dark:text-black">
          {name}
        </h1>
        <h1 className="font-topmodern text-[20px] text-center dark:text-black">
          {history}
        </h1>
        {webpage ? (
          <Link target="_blank" to={webpage}>
            <span>
              <AiOutlineLink size={20} className="dark:text-black m-auto" />
              <h2 className="dark:text-black">Pagina Web: </h2>
            </span>
            <h2 className=" text-center hover:text-white flex dark:text-black">
              {webpage}
            </h2>
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
