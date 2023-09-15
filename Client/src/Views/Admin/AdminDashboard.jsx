import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainings, getTrainingsByValue } from "../../Redux/Actions/Actions";
import { NavLink } from "react-router-dom";
import QAndA from "../../components/AdminViews/QAndA.jsx";
import { Tab, initTE } from "tw-elements";
import { Datepicker, Input } from "tw-elements";
import Users from "../../components/AdminViews/Users";
import Companies from "../../components/AdminViews/Companies";
import TrainingCard from "../Trainings/CardTrainings";
import Faq from "../../Views/Faq/Faq.jsx";
import Admins from "../../components/AdminViews/Admins/Admins";

const AdminDashboard = () => {
  initTE({ Datepicker, Input, Tab }, { allowReinits: true });
  const dispatch = useDispatch();
  const { trainingsApproved, trainingsDeclined, trainingsNoCheck } =
    useSelector((state) => state);
  const [approvedState, setApproved] = useState(false);
  const [declinedState, setDeclined] = useState(false);
  const [noCheckState, setNocheck] = useState(false);
  const [activeTab, setActiveTab] = useState("capacitaciones");

  console.log(activeTab);

  //   const approvedFiltered = trainingsValue.filter(t => t.approved === true)
  //   const declinedFiltered = trainingsValue.filter(t => t.approved === false)
  //   const noCheckFiltered = trainingsValue.filter(t => t.approved === null)

  const approved = "approved";
  const declined = "declined";
  const noCheck = "noCheck";

  //   useEffect(()=>{
  //    dispatch(getTrainings())
  //   },[])

  const handleTrainingsApproved = (value) => {
    setApproved(!approvedState);
    dispatch(getTrainingsByValue(value));
  };

  const handleTrainingsDeclined = (value) => {
    setDeclined(!declinedState);
    dispatch(getTrainingsByValue(value));
  };

  const handleTrainingsNoCheck = (value) => {
    setNocheck(!noCheckState);
    dispatch(getTrainingsByValue(value));
  };
  return (
    <main className="h-full flex flex-col">
      <div className=" flex  justify-center">
        {" "}
        <ul
          className="mb-5 flex justify-center list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          <li role="presentation">
            <a
              href="#tabs-capacitaciones"
              className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
              className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
              className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
              className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
              className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
      <div className=" lg-flex lg:flex-row flex flex-col   ">
        <div className="w-[500px] m-auto h-full   ">
          <div
            className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-capacitaciones"
            role="tabpanel"
            aria-labelledby="tabs-capacitaciones-tab"
            data-te-tab-active
          >
            <button
              className="border-b-2 border-light-1 font-topmodern p-2 text-[25px]"
              onClick={() => handleTrainingsApproved(approved)}
            >
              Capacitaciones aprobadas
            </button>

            <button
              className="border-b-2 border-light-1 font-topmodern p-2 text-[25px]"
              onClick={() => handleTrainingsDeclined(declined)}
            >
              Capacitaciones rechazadas
            </button>

            <button
              className="border-b-2 border-light-1 font-topmodern p-2 text-[25px]"
              onClick={() => handleTrainingsNoCheck(noCheck)}
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
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-usuarios"
            role="tabpanel"
            aria-labelledby="tabs-usuarios-tab"
          >
            <div>
              <Users />
            </div>
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-empresas"
            role="tabpanel"
            aria-labelledby="tabs-empresas-tab"
          >
            <Companies />
          </div>
          <div
            className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-admins"
            role="tabpanel"
            aria-labelledby="tabs-admins-tab"
          >
            <Admins />
          </div>
        </div>
        <div className=" flex h-full   w-full flex-wrap ">
          {activeTab === "capacitaciones" ? (
            <div className="flex flex-wrap">
              {/* CAPACITACIONES  */}
              {approvedState === true ? (
                trainingsApproved?.length !== 0 ? (
                  trainingsApproved?.map((t, i) => {
                    return (
                      <div key={i}>
                        <NavLink to={`/training/detail/${t.id}`}>
                          <TrainingCard training={t} />{" "}
                        </NavLink>
                      </div>
                    );
                  })
                ) : (
                  <p>No hay capacitaciones aprobadas</p>
                )
              ) : null}

              {declinedState === true ? (
                trainingsDeclined?.length !== 0 ? (
                  trainingsDeclined?.map((t, i) => {
                    return (
                      <div key={i}>
                        <NavLink to={`/training/detail/${t.id}`}>
                          {t.name}{" "}
                        </NavLink>
                      </div>
                    );
                  })
                ) : (
                  <p className="font-nunito text-[20px]">
                    No hay capacitaciones rechazadas
                  </p>
                )
              ) : null}

              {noCheckState === true ? (
                trainingsNoCheck?.length !== 0 ? (
                  trainingsNoCheck?.map((t, i) => {
                    return (
                      <div key={i}>
                        <NavLink to={`/training/detail/${t.id}`}>
                          <TrainingCard training={t} />{" "}
                        </NavLink>
                      </div>
                    );
                  })
                ) : (
                  <p>No hay capacitaciones pendientes</p>
                )
              ) : null}
              {/* CAPACITACIONES  */}
            </div>
          ) : activeTab === "preguntas" ? (
            <div>
              {" "}
              {/* PREGUNTAS */}
              <Faq />
              {/* PREGUNTAS */}{" "}
            </div>
          ) : activeTab === "usuarios" ? (
            <div>
              {" "}
              {/* PREGUNTAS */}
              En desarrollo
              {/* PREGUNTAS */}{" "}
            </div>
          ) : activeTab === "empresas" ? (
            <div>
              {" "}
              {/* PREGUNTAS */}
              En desarrollo
              {/* PREGUNTAS */}{" "}
            </div>
          ) : activeTab === "admins" ? (
            <div>
              {" "}
              {/* PREGUNTAS */}
              En desarrollo
              {/* PREGUNTAS */}{" "}
            </div>
          ) : (
            <div>
              {" "}
              {/* PREGUNTAS */}
              En desarrollo
              {/* PREGUNTAS */}{" "}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

{
  /* <div className="h-full flex flex-col items-center  ">
  <ul
    class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
    role="tablist"
    data-te-nav-ref
  >
    <li role="presentation">
      <a
        href="#tabs-capacitaciones"
        className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        data-te-toggle="pill"
        data-te-target="#tabs-capacitaciones"
        data-te-nav-active
        role="tab"
        aria-controls="tabs-capacitaciones"
        aria-selected="true"
      >
        Capacitaciones
      </a>
    </li>
    <li role="presentation">
      <a
        href="#tabs-preguntas"
        className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        data-te-toggle="pill"
        data-te-target="#tabs-preguntas"
        role="tab"
        aria-controls="tabs-preguntas"
        aria-selected="false"
      >
        Preguntas Frecuentes
      </a>
    </li>
    <li role="presentation">
      <a
        href="#tabs-usuarios"
        className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        data-te-toggle="pill"
        data-te-target="#tabs-usuarios"
        role="tab"
        aria-controls="tabs-usuarios"
        aria-selected="false"
      >
        Usuarios
      </a>
    </li>
    <li role="presentation">
      <a
        href="#tabs-empresas"
        className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        data-te-toggle="pill"
        data-te-target="#tabs-empresas"
        role="tab"
        aria-controls="tabs-empresas"
        aria-selected="false"
      >
        Empresas
      </a>
    </li>
    <li role="presentation">
      <a
        href="#tabs-admins"
        className=" font-nunito  my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-[15px] font-bold uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-light-1 data-[te-nav-active]:text-black dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
        data-te-toggle="pill"
        data-te-target="#tabs-admins"
        role="tab"
        aria-controls="tabs-admins"
        aria-selected="false"
      >
        Admins
      </a>
    </li>
  </ul>

  <div class="mb-6">
    <div
      class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
      id="tabs-capacitaciones"
      role="tabpanel"
      aria-labelledby="tabs-capacitaciones-tab"
      data-te-tab-active
    >
      <button
        className="border-2 font-topmodern"
        onClick={() => handleTrainingsApproved(approved)}
      >
        Capacitaciones aprobadas
      </button>
      {approvedState === true ? (
        trainingsApproved.length !== 0 ? (
          trainingsApproved.map((t, i) => {
            return (
              <div key={i}>
                <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>
              </div>
            );
          })
        ) : (
          <p>No hay capacitaciones aprobadas</p>
        )
      ) : null}

      <button onClick={() => handleTrainingsDeclined(declined)}>
        Capacitaciones rechazadas
      </button>
      {declinedState === true ? (
        trainingsDeclined.length !== 0 ? (
          trainingsDeclined.map((t, i) => {
            return (
              <div key={i}>
                <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>
              </div>
            );
          })
        ) : (
          <p>No hay capacitaciones rechazadas</p>
        )
      ) : null}

      <button onClick={() => handleTrainingsNoCheck(noCheck)}>
        Capacitaciones pendientes
      </button>
      {noCheckState === true ? (
        trainingsNoCheck.length !== 0 ? (
          trainingsNoCheck.map((t, i) => {
            return (
              <div key={i}>
                <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>
              </div>
            );
          })
        ) : (
          <p>No hay capacitaciones pendientes</p>
        )
      ) : null}
    </div>

    <div
      class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
      id="tabs-preguntas"
      role="tabpanel"
      aria-labelledby="tabs-preguntas-tab"
    >
      <QAndA />
    </div>
    <div
      class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
      id="tabs-usuarios"
      role="tabpanel"
      aria-labelledby="tabs-usuarios-tab"
    >
      <div>
        <Users />
      </div>
    </div>
    <div
      class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
      id="tabs-empresas"
      role="tabpanel"
      aria-labelledby="tabs-empresas-tab"
    >
      <Companies />
    </div>
    <div
      class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
      id="tabs-admins"
      role="tabpanel"
      aria-labelledby="tabs-admins-tab"
    >
      Tab 5 content
    </div>
  </div>
</div>; */
}
