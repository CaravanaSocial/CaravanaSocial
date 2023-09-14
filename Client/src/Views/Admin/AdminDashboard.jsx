import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainings, getTrainingsByValue } from "../../Redux/Actions/Actions";
import { NavLink } from "react-router-dom";
import QAndA from "../../components/AdminViews/QAndA.jsx";
import { Tab, initTE } from "tw-elements";
import { Datepicker, Input } from "tw-elements";
import Users from "../../components/AdminViews/Users";
import Companies from "../../components/AdminViews/Companies";

const AdminDashboard = () => {
  initTE({ Datepicker, Input, Tab }, { allowReinits: true });
  const dispatch = useDispatch();
  const { trainingsApproved, trainingsDeclined, trainingsNoCheck } =
    useSelector((state) => state);
  const [approvedState, setApproved] = useState(false);
  const [declinedState, setDeclined] = useState(false);
  const [noCheckState, setNocheck] = useState(false);

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
    <div className="h-full">
      <ul
        class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist"
        data-te-nav-ref
      >
        <li role="presentation">
          <a
            href="#tabs-capacitaciones"
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
            class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
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
          <button onClick={() => handleTrainingsApproved(approved)}>
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
    </div>
  );
};

export default AdminDashboard;
