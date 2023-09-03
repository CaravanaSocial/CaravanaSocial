import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/Actions/Actions";
import { Navigate } from "react-router-dom";

export default function NavBar() {
  const currentAccount = useSelector((state) => state.currentAccount);

  const [theme, setTheme] = useState("Claro");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "Oscuro") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "Oscuro" ? "Claro" : "Oscuro");
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border-b-2 border-b-zinc-100 dark:border-b-zinc-800 p-2">
      <a href="/">
        <img className="w-14" src={logo}></img>
      </a>

      <div className="relative flex items-center w-30 h-5 mt-2.5 lg:w-64 group">
        <div className="absolute z-50 flex items-center justify-center w-30 h-10 p-3 pr-2 text-sm text-gray-500 cursor-pointer sm:hidden">
          <svg
            className="relative w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <svg
          className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
        <input
          className="block w-30 py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
          placeholder="Search"
          type="text"
        />
      </div>

      <div className="mt-1.5">
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            className="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            type="checkbox"
            name="toggle"
            id="toggle"
            onClick={handleThemeSwitch}
          />

          <label
            className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
            htmlFor="toggle"
          ></label>
        </div>
        <span className="font-medium text-gray-400">{theme}</span>
      </div>

      {Object.keys(currentAccount).length !== 0 ? (
        <button
          className="text-gray-400 border-4 border-gray-400 font-bold text-sm bg-white rounded-3xl flex py-1 px-2 items-center"
          onClick={() => handleLogout()}
        >
          <CgProfile className="w-[40px] h-[30px]" />
          Salir
        </button>
      ) : (
        <Link to="/login">
          <button className="text-gray-400 border-4 border-gray-400 font-bold text-sm bg-white rounded-3xl flex py-1 px-2 items-center">
            <CgProfile className="w-[40px] h-[30px]" />
            Entrar
          </button>
        </Link>
      )}
    </div>
  );
}

{
  /* <button onClick={() => handleLogout()}>LOGOUT</button>; */
}
