import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainingsByValue } from "../../Redux/Actions/Actions";
import { NavLink } from "react-router-dom";
import QAndA from "../../components/AdminViews/QAndA.jsx";
import { Tab, initTE } from "tw-elements";
import { Datepicker, Input } from "tw-elements";
import TrainingCard from "../Trainings/CardTrainings";
import Faq from "../../Views/Faq/Faq.jsx";
import NotFound from "../../components/NotFound";
import validation from "../../components/AdminViews/validations.js";
import Swal from "sweetalert2";
import {
  deleteUsers,
  getUsers,
  restoreUsers,
  deleteCompanies,
  getCompanies,
  restoreCompanies,
  deletedAdmins,
  getAdmins,
  restoreAdmins,
  createAdmin,
  clearErrors,
  setNewErrors,
} from "../../Redux/Actions/Actions";
import { CgEye } from "react-icons/cg";

const AdminDashboard = () => {
  initTE({ Datepicker, Input, Tab }, { allowReinits: true });
  const dispatch = useDispatch();
  const { trainingsApproved, trainingsDeclined, trainingsNoCheck } =
    useSelector((state) => state);
  const usersDelete = useSelector((state) => state.usersDelete);
  const users = useSelector((state) => state.users);
  const { companies, companiesDelete } = useSelector((state) => state);
  const { admins, adminsDeleted } = useSelector((state) => state);
  const globalErrors = useSelector((state) => state.errors);

  const [activeTab, setActiveTab] = useState("capacitaciones");
  const [updated, setUpdated] = useState(false);

  const [trainingView, setTraingView] = useState(false);
  const [userView, setUserView] = useState(false);
  const [companieView, setCompanieView] = useState(false);
  const [adminView, setAdminView] = useState(false);

  const [inputAdmin, setInputAdmin] = useState({
    name: "",
    email: "",
    password: "",
    createKey: "R*7fE2$9cH@6DpT",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTrainingsByValue(approved));
    dispatch(getTrainingsByValue(declined));
    dispatch(getTrainingsByValue(noCheck));
    dispatch(getUsers(online));
    dispatch(getUsers(deleted));
    dispatch(getCompanies(online));
    dispatch(getCompanies(deleted));
    dispatch(getAdmins(online));
    dispatch(getAdmins(deleted));
  }, [updated]);

  const approved = "approved";
  const declined = "declined";
  const noCheck = "noCheck";

  const online = "online";
  const deleted = "deleted";
  const create = "crear";

  const handleTrainingView = (value) => {
    if (trainingView === value) {
      setTraingView(false);
    } else {
      setTraingView(value);
    }
    dispatch(getTrainingsByValue(value));
  };

  const handleUsersView = (value) => {
    if (userView === value) {
      setUserView(false);
    } else {
      setUserView(value);
    }
    dispatch(getUsers(value));
  };

  const handleDeletedUsers = (e, id) => {
    e.preventDefault();
    dispatch(deleteUsers(id)).then(() => {
      dispatch(getUsers());
      dispatch(getUsers(deleted));
    });
    setUpdated(!updated);
  };

  const handleRestoredUsers = (e, id) => {
    e.preventDefault();
    dispatch(restoreUsers(id)).then(() => {
      dispatch(getUsers());
      dispatch(getUsers(deleted));
    });
    setUpdated(!updated);
  };

  const handleCompanyView = (value) => {
    if (companieView === value) {
      setCompanieView(false);
    } else {
      setCompanieView(value);
    }
    dispatch(getCompanies(value));
  };

  const handleDeletedComanies = (e, id) => {
    e.preventDefault();
    dispatch(deleteCompanies(id)).then(() => {
      dispatch(getCompanies());
      dispatch(getCompanies(deleted));
    });
    setUpdated(!updated);
  };

  const handleRestoredCompanies = (e, id) => {
    e.preventDefault();
    dispatch(restoreCompanies(id)).then(() => {
      dispatch(getCompanies());
      dispatch(getCompanies(deleted));
    });
    setUpdated(!updated);
  };

  const handleAdminView = (value) => {
    if (adminView === value) {
      setAdminView(false);
    } else {
      setAdminView(value);
    }
    dispatch(getAdmins(value));
  };

  const handleDeletedAdmins = (e, id) => {
    e.preventDefault();
    dispatch(deletedAdmins(id)).then(() => {
      dispatch(getAdmins());
      dispatch(getAdmins(deleted));
    });
    setUpdated(!updated);
  };

  const handleRestoredAdmins = (e, id) => {
    e.preventDefault();
    dispatch(restoreAdmins(id)).then(() => {
      dispatch(getAdmins());
      dispatch(getAdmins(deleted));
    });
    setUpdated(!updated);
  };

  const handleChangeAdmin = (event) => {
    const { name, value } = event.target;
    setInputAdmin({
      ...inputAdmin,
      [name]: value,
    });
    setErrors(
      validation({
        ...inputAdmin,
        [name]: value,
      })
    );
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    dispatch(
      createAdmin({
        name: inputAdmin.name,
        email: inputAdmin.email,
        password: inputAdmin.password,
        createKey: inputAdmin.createKey,
      })
    ).then((postError) => {
      if (!postError) {
        dispatch(clearErrors());
        Swal.fire(
          'Listo!',
          'Has creado un nuevo administrador!',
          'success'
        )
        setInputAdmin({...inputAdmin, 
        name: "",
        email: "",
        password: "",})
      } else {
        dispatch(
          setNewErrors({ type: "CREATE_ADMIN", error: postError?.response?.data })
        );
      }
    });
  };

  const password1 = "password1"

  const handlePass1 = () => {
    const view = document.getElementById(password1);

    if (view.type === "password"){
      view.type = "text";
    } else {
      view.type = "password";
    }
  }

  return (
    <main className="h-full flex flex-col">
      {localStorage.length !== 0 && localStorage.type === "superAdmin" ? (
        <>
          <div className="flex justify-center">
            {" "}
            <ul
              className="flex justify-center list-none flex-row flex-wrap bg-gray-200 dark:bg-gray-950 w-full"
              role="tablist"
              data-te-nav-ref
            >
              <li role="presentation">
                <a
                  href="#tabs-capacitaciones"
                  className=" font-nunito my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-light-2 dark:data-[te-nav-active]:text-light-1"
                  data-te-toggle="pill"
                  data-te-target="#tabs-capacitaciones"
                  data-te-nav-active
                  role="tab"
                  aria-controls="tabs-capacitaciones"
                  aria-selected="true"
                  onClick={() => setActiveTab("capacitaciones")}
                >
                  Capacitaciones
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#tabs-preguntas"
                  className=" font-nunito my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-light-2 dark:data-[te-nav-active]:text-light-1"
                  data-te-toggle="pill"
                  data-te-target="#tabs-preguntas"
                  role="tab"
                  aria-controls="tabs-preguntas"
                  aria-selected="false"
                  onClick={() => setActiveTab("preguntas")}
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#tabs-usuarios"
                  className=" font-nunito my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-light-2 dark:data-[te-nav-active]:text-light-1"
                  data-te-toggle="pill"
                  data-te-target="#tabs-usuarios"
                  role="tab"
                  aria-controls="tabs-usuarios"
                  aria-selected="false"
                  onClick={() => setActiveTab("usuarios")}
                >
                  Usuarios
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#tabs-empresas"
                  className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-light-2 dark:data-[te-nav-active]:text-light-1"
                  data-te-toggle="pill"
                  data-te-target="#tabs-empresas"
                  role="tab"
                  aria-controls="tabs-empresas"
                  aria-selected="false"
                  onClick={() => setActiveTab("empresas")}
                >
                  Empresas
                </a>
              </li>
              <li role="presentation">
                <a
                  href="#tabs-admins"
                  className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-light-2 dark:data-[te-nav-active]:text-light-1"
                  data-te-toggle="pill"
                  data-te-target="#tabs-admins"
                  role="tab"
                  aria-controls="tabs-admins"
                  aria-selected="false"
                  onClick={() => setActiveTab("admins")}
                >
                  Admins
                </a>
              </li>
            </ul>
          </div>
          <div className="lg-flex lg:flex-row flex flex-col">
            <div className="bg-gray-200 dark:bg-gray-950">
              <div
                className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="tabs-capacitaciones"
                role="tabpanel"
                aria-labelledby="tabs-capacitaciones-tab"
                data-te-tab-active
              >
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleTrainingView(approved)}
                >
                  Capacitaciones aprobadas
                </button>
                <br />
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleTrainingView(declined)}
                >
                  Capacitaciones rechazadas
                </button>
                <br />
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleTrainingView(noCheck)}
                >
                  Capacitaciones pendientes
                </button>
              </div>

              <div
                className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="tabs-preguntas"
                role="tabpanel"
                aria-labelledby="tabs-preguntas-tab"
              >
                <QAndA />
              </div>

              <div
                className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="tabs-usuarios"
                role="tabpanel"
                aria-labelledby="tabs-usuarios-tab"
              >
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleUsersView(online)}
                >
                  Usuarios Activos
                </button>
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleUsersView(deleted)}
                >
                  Usuarios Bloqueados
                </button>
              </div>

              <div
                className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="tabs-empresas"
                role="tabpanel"
                aria-labelledby="tabs-empresas-tab"
              >
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleCompanyView(online)}
                >
                  Empresas Activos
                </button>
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleCompanyView(deleted)}
                >
                  Empresas Bloqueados
                </button>
              </div>

              <div
                className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                id="tabs-admins"
                role="tabpanel"
                aria-labelledby="tabs-admins-tab"
              >
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleAdminView(online)}
                >
                  Admins Activos
                </button>
                <br />
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleAdminView(deleted)}
                >
                  Admins Bloqueados
                </button>
                <button
                  className="border-b-2 border-light-1 dark:text-neutral-400 font-topmodern p-2 text-[25px]"
                  onClick={() => handleAdminView(create)}
                >
                  Crear Admin
                </button>
              </div>
            </div>
            <div className="flex h-full w-full flex-wrap justify-center mt-5">
              {activeTab === "capacitaciones" ? (
                <div>
                  {trainingView === approved ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Capacitaciones aprobadas
                      </h1>
                      {trainingsApproved?.length !== 0 ? (
                        <div className="flex flex-wrap text-center justify-center">
                          {trainingsApproved?.map((t, i) => {
                            return (
                              <div className="m-2" key={i}>
                                <NavLink to={`/training/detail/${t.id}`}>
                                  <TrainingCard training={t} />{" "}
                                </NavLink>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <h1 className="text-2xl text-center dark:text-gray-300">
                          No hay capacitaciones aprobadas
                        </h1>
                      )}
                    </div>
                  ) : trainingView === declined ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Capacitaciones rechazadas
                      </h1>
                      {trainingsDeclined?.length !== 0 ? (
                        <div className="flex flex-wrap text-center justify-center">
                          {trainingsDeclined?.map((t, i) => {
                            return (
                              <div className="m-2" key={i}>
                                <NavLink to={`/training/detail/${t.id}`}>
                                  <TrainingCard training={t} />{" "}
                                </NavLink>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <h1 className="text-2xl text-center dark:text-gray-300">
                          No hay capacitaciones rechazadas
                        </h1>
                      )}
                    </div>
                  ) : trainingView === noCheck ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Capacitaciones pendientes
                      </h1>
                      {trainingsNoCheck?.length !== 0 ? (
                        <div className="flex flex-wrap text-center justify-center">
                          {trainingsNoCheck?.map((t, i) => {
                            return (
                              <div className="m-2" key={i}>
                                <NavLink to={`/training/detail/${t.id}`}>
                                  <TrainingCard training={t} />{" "}
                                </NavLink>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <h1 className="text-2xl text-center dark:text-gray-300">
                          No hay capacitaciones pendientes
                        </h1>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : activeTab === "preguntas" ? (
                <div className="mx-5">
                  <Faq />
                </div>
              ) : activeTab === "usuarios" ? (
                <div>
                  {userView === online ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Usuarios activos
                      </h1>
                      <div className="flex flex-col justify-center">
                        {users?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 bg-red-300 dark:text-black dark:bg-red-700 border-2 border-red-400 font-nunito"
                              onClick={(e) => handleDeletedUsers(e, u.id)}
                            >
                              Bloquear
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : userView === deleted ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Usuarios bloqueados
                      </h1>
                      <div className="flex flex-col justify-center">
                        {usersDelete?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 border-2 border-green-400 dark:text-black dark:bg-green-500 bg-green-300 font-nunito"
                              onClick={(e) => handleRestoredUsers(e, u.id)}
                            >
                              Restablecer
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : activeTab === "empresas" ? (
                <div>
                  {companieView === online ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Empresas activas
                      </h1>
                      <div className="flex flex-col justify-center">
                        {companies?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 bg-red-300 dark:text-black dark:bg-red-700 border-2 border-red-400 font-nunito"
                              onClick={(e) => handleDeletedComanies(e, u.id)}
                            >
                              Bloquear
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : companieView === deleted ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Empresas bloqueadas
                      </h1>
                      <div className="flex flex-col justify-center">
                        {companiesDelete?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 border-2 border-green-400 dark:text-black dark:bg-green-500 bg-green-300 font-nunito"
                              onClick={(e) => handleRestoredCompanies(e, u.id)}
                            >
                              Restablecer
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : activeTab === "admins" ? (
                <div>
                  {adminView === online ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Admins activos
                      </h1>
                      <div className="flex flex-col justify-center">
                        {admins?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 bg-red-300 dark:text-black dark:bg-red-700 border-2 border-red-400 font-nunito"
                              onClick={(e) => handleDeletedAdmins(e, u.id)}
                            >
                              Bloquear
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : adminView === deleted ? (
                    <div>
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Admins bloqueados
                      </h1>
                      <div className="flex flex-col justify-center">
                        {adminsDeleted?.map((u) => (
                          <div
                            className="flex justify-between w-[450px] border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 items-center rounded-xl p-2 my-2"
                            key={u.id}
                          >
                            <div>
                              <h2 className="font-nunito border-b-2 border-light-1">
                                {u.name} {u.lastName}
                              </h2>
                              <h2 className="font-nunito">{u.email}</h2>
                            </div>
                            <button
                              className="my-2 mx-5 hover:scale-105 rounded-3xl p-2 border-2 border-green-400 dark:text-black dark:bg-green-500 bg-green-300 font-nunito"
                              onClick={(e) => handleRestoredAdmins(e, u.id)}
                            >
                              Restablecer
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : adminView === create ? (
                    <div className="flex flex-col text-center justify-center border-2 border-light-1 p-5 rounded-3xl">
                      <h1 className="mb-5 text-4xl font-vilaka font-bold text-[50px] text-center border-b-2 border-light-1 dark:border-light-2 rounded-sm dark:text-gray-300">
                        Crear admin
                      </h1>
                      <h2>Nombre</h2>

                      <input
                        className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                        type="text"
                        name="name"
                        value={inputAdmin.name}
                        placeholder="Nombre..."
                        onChange={handleChangeAdmin}
                      />
                      
                      <h3 className="text-red-600">
                        {errors.name ? errors.name : null}
                      </h3>

                      <h2>Email</h2>

                      <input
                        className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                        type="email"
                        name="email"
                        value={inputAdmin.email}
                        placeholder="Email..."
                        onChange={handleChangeAdmin}
                      />
                      
                      <h3 className="text-red-600">
                        {errors.email ? errors.email : null}
                      </h3>

                      <h2>Contraseña</h2>

                      <div className="flex justify-center text-center">
                        <input className="h-8 rounded-3xl px-2 mt-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                          onChange={handleChangeAdmin}
                          type="password"
                          id="password1"
                          value={inputAdmin.password}
                          placeholder="Contraseña..."
                          name="password"/>

                        <button className="absolute z-50 flex items-center justify-center ml-40 mt-4"
                          type="button"
                          onClick={handlePass1}>
                          <CgEye/>
                        </button>
                      </div>

                      <h3 className="text-red-600">
                        {errors.password ? errors.password : null}
                      </h3>
                      <h3
                        className="text-red-600"
                        style={{
                          visibility: globalErrors?.CREATE_ADMIN?.error
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        {globalErrors?.CREATE_ADMIN?.error}
                      </h3>
                      
                      <div>
                        <br />
                        <button
                          className="bg-light-1 font-nunito font-bold rounded-3xl w-16 p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
                          onClick={handleCreateAdmin}
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
