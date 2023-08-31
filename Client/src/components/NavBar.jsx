import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpg";
import { CgProfile } from "react-icons/cg";

export default function NavBar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="w-full bg-light-1 h-10  text-black font-topmodern flex justify-center items-center">
        Caravana Social
      </div>
      <div className="w-full flex px-5 h-[200px]">
        <div className="flex w-[650px] ">
          <button
            onClick={handleThemeSwitch}
            className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[200px] flex"
          >
            Modo Oscuro
          </button>
          <button className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[200px] flex">
            Contacto
          </button>
          <button className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[200px] flex">
            Inicio
          </button>{" "}
          <button className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[200px] flex">
            Empresa
          </button>
          <button className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[200px] flex">
            Blog
          </button>
        </div>
        <div className="w-[500px] flex justify-center ">
          <a className="h-[20px] " href="/">
            <img
              className="h-[150px] w-[150px] rounded bg-slate-500 "
              src={logo}
              width={100}
            ></img>
          </a>
        </div>
        <div className="w-[600px] flex justify-end ">
          <button className="text-black gap-1 hover:text-gray-700 text-lg font-topmodern h-10 mt-10 w-[100px] flex">
            <CgProfile className="text-black flex" size={25} /> Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
