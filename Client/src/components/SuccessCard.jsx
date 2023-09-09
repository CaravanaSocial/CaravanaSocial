import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const SuccessCard = (props) => {
  return (
    <main className=" md:flex md:flex-row items-center p-2 flex flex-col justify-center gap-11 ">
      <div>
        <img
          className="w-[700px] h-[500px] rounded "
          src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        ></img>
      </div>
      <div className="w-[300px] ">
        <h1 className="font-vilaka text-center text-[50px] font-bold">
          Alejandro
        </h1>
        <h1 className="font-topmodern text-[20px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis veniam
          eveniet, dolores, perferendis adipisci eligendi fuga corporis
          perspiciatis assumenda nesciunt, quam quaerat autem error quis commodi
          molestiae provident laborum excepturi.
        </h1>
        <Link>
          <span className=" hover:text-white flex">
            <AiOutlineLink size={20} />
            <h2>Pagina Web </h2>: www.google.com
          </span>
          <br />
        </Link>
        <div className="flex gap-5 justify-center">
          <Link>
            <FaFacebook size={30} />
          </Link>
          <Link>
            <BsInstagram size={30} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SuccessCard;
