import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { CgProfile } from "react-icons/cg";
import { CgSearch } from "react-icons/cg";
import { CgHomeAlt } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { companyButtons, logOut } from "../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  searchFreelancersByName,
  getFreelancers,
  getTrainings,
  searchTrainingByName,
  searchOffersByName,
  getOffers,
  enableSpeech,
} from "../Redux/Actions/Actions";
import Swal from "sweetalert2";

export default function NavBar() {
  const location = useLocation();
  const [theme, setTheme] = useState("Claro");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const speech = useSelector((state) => state.enableSpeech);
  const [menu, setMenu] = useState(false);
  const account =
    localStorage.length !== 0 ? JSON.parse(localStorage.account) : null;
  const [input, setInput] = useState("");

  useEffect(() => {
    if (theme === "Oscuro") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return setInput("");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "Oscuro" ? "Claro" : "Oscuro");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro de que deseas cerrar sesión?",
      text: "Se cerrará tu sesión actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a7b698",
      cancelButtonColor: "#d33",
      iconColor: "#a7b698",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOut());
        dispatch(companyButtons(false));
        navigate("/login");
      }
    });
  };

  const handleSpeech = (e) => {
    e.preventDefault();
    dispatch(enableSpeech(!speech));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (location.pathname === "/home-freelancers") {
        dispatch(searchFreelancersByName(input));
    }

    if (location.pathname === "/home-trainings") {
      console.log(input)
      if (input === "") {
        dispatch(getTrainings());
      } else {
        dispatch(searchTrainingByName(input));
      }
    }

    if (location.pathname === "/home-offers") {
      if (input === "") {
        dispatch(getOffers());
      } else {
        dispatch(searchOffersByName(input));
      }
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    if (menu) {
      setMenu(false);
    }
  };

  const shouldRenderSearchBar = !(
    location.pathname === "/" ||
    location.pathname === "/home" ||
    /^\/freelancer\//.test(location.pathname) ||
    /^\/training\/detail\//.test(location.pathname) ||
    location.pathname.startsWith("/home-offers/") ||
    location.pathname.startsWith("/company/") ||
    location.pathname === "/create-trainings" ||
    location.pathname === "/create-jobs" ||
    location.pathname === "/admin" ||
    location.pathname === "/register-user" ||
    location.pathname === "/register-company" ||
    location.pathname === "/login" ||
    location.pathname === `/${account?.name + account?.lastName}` ||
    location.pathname === "/profile-company" ||
    location.pathname === "/faq" ||
    location.pathname === "/blogs" ||
    location.pathname.startsWith("/blogs/")
  );

  return (
    <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border-b-[1px] border-b-gray-300 dark:border-b-gray-700 p-2">
      <Link to="/">
        <img className="w-[60px] h-[60px]" src={logo}></img>
      </Link>

      {shouldRenderSearchBar && (
        <div className="relative flex items-center lg:w-64 group">
          <button className="absolute z-50 flex items-center justify-center p-3 pr-2 text-sm text-gray-500 cursor-pointer">
            <CgSearch className="w-[20px] h-[20px] hover:text-light-1" />
          </button>
          <input
            className="block w-30 py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1 ring-opacity-90 bg-gray-200 dark:bg-gray-800 text-black font-topmodern aa-input"
            placeholder="Search"
            type="text"
            onChange={handleChange}
            onClick={handleSubmit()}
          />
        </div>
      )}

      <div className="relative">
        <div className="inline-flex items-center overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800 p-0.5 hover:p-0 hover:border-2 hover:border-light-1">
          <button
            onMouseEnter={handleMenu}
            className="h-full p-2 text-gray-700 dark:text-gray-400"
            onClick={handleMenu}
          >
            <CgHomeAlt className="ml-2" size={20} />
            <h2 className="text-sm font-semibold">Menu</h2>
          </button>
        </div>

        {menu === true ? (
          <div
            onMouseLeave={closeMenu}
            className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-200 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl"
            role="menu"
            onClick={handleMenu}
          >
            <div className="justify-items-center">
              <strong className="block p-2 text-xs font-medium uppercase text-center text-gray-400">
                Perfil
              </strong>
              {localStorage.length !== 0 ? (
                <div className="flex items-center justify-between m-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                  {localStorage.type === "user" ? (
                    <div className="text-gray-500 flex justify-center text-sm dark:text-gray-300">
                      <CgProfile className="w-[25px] h-[25px] text-gray-400 mx-1 hover:text-light-1" />

                      <Link to="/profile-user" />

                      <Link to={`/${account.name + account.lastName}`}>
                        <h1 className="pt-0.5 hover:text-light-1">
                          {account.name} {account.lastName}
                        </h1>
                      </Link>
                    </div>
                  ) : localStorage.type === "company" ? (
                    <div className="text-gray-500 flex justify-center text-sm dark:text-gray-300">
                      <CgProfile className="w-[25px] h-[25px] text-gray-400 mx-1 hover:text-light-1" />
                      <Link to="/profile-company">
                        <h1 className="pt-0.5 hover:text-light-1">
                          {account.nameCompany}
                        </h1>
                      </Link>
                    </div>
                  ) : localStorage.type === "superAdmin" ? (
                    <div className="text-gray-500 flex justify-center text-sm dark:text-gray-300">
                      <CgProfile className="w-[25px] h-[25px] text-gray-400 mx-1 hover:text-light-1" />
                      <Link to="/admin">
                        <h1 className="pt-0.5 hover:text-light-1">
                          {account.name}
                        </h1>
                      </Link>
                    </div>
                  ) : localStorage.type === "admin" ? (
                    <div className="text-gray-500 flex justify-center text-sm dark:text-gray-300">
                      <CgProfile className="w-[25px] h-[25px] text-gray-400 mx-1 hover:text-light-1" />
                      <Link to="/admin">
                        <h1 className="pt-0.5 hover:text-light-1">
                          {account.name}
                        </h1>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <h1 className="pt-0.5 hover:text-light-1">
                        Cuenta no reconocida
                      </h1>
                    </div>
                  )}

                  <button
                    className="text-red-400 hover:text-red-600 pb-0.5 text-sm"
                    onClick={() => handleLogout()}
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <div className="flex items-center justify-center m-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg text-blue-500 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-500">
                    <button className=" pb-0.5 text-sm">Iniciar Sesión</button>
                  </div>
                </Link>
              )}
            </div>

            <div className="p-2">
              <strong className="block p-2 text-xs font-medium uppercase text-center text-gray-400 ">
                General
              </strong>
              <Link
                className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                to="/"
                role="menuitem"
              >
                Landing
              </Link>

              <Link
                className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                to="/home"
                role="menuitem"
              >
                Home
              </Link>

              {localStorage.type === "company" ? (
                <>
                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/create-trainings"
                    role="menuitem"
                  >
                    Crear Capacitacion
                  </Link>

                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/create-jobs"
                    role="menuitem"
                  >
                    Crear Avisos de Trabajo
                  </Link>
                </>
              ) : localStorage.type === "admin" ? (
                <>
                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/blog-create"
                    role="menuitem"
                  >Panel de Blog</Link>
                </>
              ) : localStorage.type === "superAdmin" ? (
                <>
                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/create-trainings"
                    role="menuitem"
                  >
                    Crear Capacitacion
                  </Link>

                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/create-jobs"
                    role="menuitem"
                  >
                    Crear Avisos de Trabajo
                  </Link>

                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/create-success"
                    role="menuitem"
                  >
                    Crear casos de éxito
                  </Link>

                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/blog-create"
                    role="menuitem"
                  >
                    Panel de Blog
                  </Link>

                  <Link
                    className="text-center block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    to="/admin"
                    role="menuitem"
                  >
                    Panel de Admin
                  </Link>
                </>
              ) : null}
            </div>

            <div className="p-2">
              <strong className="text-center block p-2 text-xs font-medium uppercase text-gray-400">
                Ajustes
              </strong>
              <div className="mt-1.5 text-center flex justify-between bg-gray-200 p-2 rounded-lg dark:bg-gray-600">
                <span className="font-medium text-gray-400">Tema: {theme}</span>
                <div
                  className="relative inline-block w-10 mr-2 align-middle select-none"
                  onClick={handleThemeSwitch}
                >
                  {theme === "Claro" ? (
                    <input
                      className="outline-none focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                    />
                  ) : (
                    <input
                      className="bg-gray-500 outline-none focus:outline-none right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full border-4 border-gray-300 appearance-none cursor-pointer"
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                    />
                  )}
                  <label
                    className="block h-6 overflow-hidden bg-gray-400 rounded-full cursor-pointer"
                    htmlFor="toggle"
                  ></label>
                </div>
              </div>

              <div className="mt-1.5 text-center flex justify-between bg-gray-200 p-2 rounded-lg dark:bg-gray-600">
                <span className="font-medium text-gray-400">Texto por Voz</span>
                <div
                  className="relative inline-block w-10 mr-2 align-middle select-none"
                  onClick={handleSpeech}
                >
                  {speech === false ? (
                    <input
                      className="outline-none focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                    />
                  ) : (
                    <input
                      className="bg-gray-500 outline-none focus:outline-none right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full border-4 border-gray-300 appearance-none cursor-pointer"
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                    />
                  )}
                  <label
                    className="block h-6 overflow-hidden bg-gray-400 rounded-full cursor-pointer"
                    htmlFor="toggle"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
