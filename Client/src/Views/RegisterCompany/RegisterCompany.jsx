import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import {
  getCountry,
  getState,
  getCity,
  getCategories,
  createCompany,
  setNewErrors,
  clearErrors,
} from "../../Redux/Actions/Actions";
import Swal from "sweetalert2";
import { CgEye } from "react-icons/cg";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries);
  const state = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const globalErrors = useSelector((state) => state.errors);

  const [companyInput, setCompanyInput] = useState({
    name: "",
    lastName: "",
    position: "",
    nameCompany: "",
    category: [],
    phone: "",
    email: "",
    emailRep: "",
    password: "",
    passwordRep: "",
    description: "",
    location: { country: "", state: "", city: "" },
  });

  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCategories());
    return () => dispatch(clearErrors());
  }, [dispatch]);

  const handleInputs = (event) => {
    event.preventDefault();
    setCompanyInput({
      ...companyInput,
      [event.target.name]: event.target.value,
    });
    setError(
      validation({
        ...companyInput,
        [event.target.name]: event.target.value,
      })
    );
  };

  const validateInput = (companyInputData) => {
    const errors = validation(companyInputData);
    setError(errors);
  };

  const handleCategory = (event) => {
    const rep = companyInput.category.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setCompanyInput({
        ...companyInput,
        category: [...companyInput.category, event.target.value],
      });
      event.target.value = "default";
      validateInput({
        ...companyInput,
        category: [...companyInput.category, event.target.value],
      });
    }
    event.target.value = "default";
  };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = companyInput.category.filter(
      (cat) => cat !== event.target.value
    );
    setCompanyInput({
      ...companyInput,
      category: filteredCat,
    });
    validateInput({ ...companyInput, category: filteredCat });
  };

  const handleLocation = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      setCompanyInput({
        ...companyInput,
        location: { ...companyInput.location, [name]: value },
      });
      setError(
        validation({
          ...companyInput,
          location: { ...companyInput.location, [name]: value },
        })
      );
      dispatch(getState(value));
    } else if (name === "state") {
      setCompanyInput({
        ...companyInput,
        location: { ...companyInput.location, [name]: value },
      });
      setError(
        validation({
          ...companyInput,
          location: { ...companyInput.location, [name]: value },
        })
      );
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setCompanyInput({
        ...companyInput,
        location: { ...companyInput.location, [name]: value },
      });
      setError(
        validation({
          ...companyInput,
          location: { ...companyInput.location, [name]: value },
        })
      );
    }
  };

  const isSubmitDisabled =
    Object.keys(error).length > 0 || companyInput.category.length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      createCompany({
        name: companyInput.name,
        lastName: companyInput.lastName,
        position: companyInput.position,
        nameCompany: companyInput.nameCompany,
        category: companyInput.category,
        phone: state.code + " " + companyInput.phone,
        email: companyInput.emailRep,
        password: companyInput.passwordRep,
        description: companyInput.description,
        location: companyInput.location,
      })
    ).then((postError) => {
      if (!postError) {
        navigate("/login");
        dispatch(clearErrors());
      } else {
        dispatch(
          setNewErrors({
            type: "CREATE_COMPANY",
            error: postError.response.data,
          })
        );
        if (postError?.response?.data.error === "Email in use") {
          Swal.fire({
            title:
              "Correo electronico ya se encuentra en uso, por favor selecciona otro",

            icon: "error",
            customClass: {
              popup: "",
            },
          });
        }
      }
    });
  };

  const password1 = "password1";
  const password2 = "password2";

  const handlePass1 = () => {
    const view = document.getElementById(password1);

    if (view.type === "password"){
      view.type = "text";
    } else {
      view.type = "password";
    }
  }

  const handlePass2 = () => {
    const view = document.getElementById(password2);

    if (view.type === "password"){
      view.type = "text";
    } else {
      view.type = "password";
    }
  }

  return (
    <div className="flex justify-center">
      <div className="justify-center text-center border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 m-4">
        <h1 className="text-3xl mb-1 font-vilaka font-bold  text-[50px] dark:text-gray-300">
          Registrarme como empresa
        </h1>

        <div className="border-t-2 border-light-1 dark:border-light-1"/>

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Nombre:{" "}
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Escribe tu nombre"
            name="name"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.name ? "visible" : "hidden" }}
          >
            {error.name}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Apellido:{" "}
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Escribe tu apellido"
            name="lastName"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.lastName ? "visible" : "hidden" }}
          >
            {error.lastName}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Cargo:{" "}
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Cargo"
            name="position"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.position ? "visible" : "hidden" }}
          >
            {error.position}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Empresa:{" "}
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Nombre de la Empresa"
            name="nameCompany"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.nameCompany ? "visible" : "hidden" }}
          >
            {error.nameCompany}
          </h3>

          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleLocation}
            name="country"
          >
            <option value="default">Pais</option>
            {country.map((p) => {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
          <br />
          <select
            className="h-8 mr-1 w-auto rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleLocation}
            name="state"
          >
            <option value="default">Estado</option>
            {state?.allStates?.map((p) => {
              return (
                <option key={p.id} id={p.id} value={p.name}>
                  {p.name}
                </option>
              );
            })}
          </select>

          <select
            className="h-8 ml-1 w-auto rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            name="city"
            onChange={handleLocation}
          >
            <option value="default">Ciudad</option>
            {city?.map((p) => {
              return (
                <option key={p} value={p}>
                  {p}
                </option>
              );
            })}
          </select>
          <h3
            className="text-red-600"
            style={{ visibility: error.location ? "visible" : "hidden" }}
          >
            {error.location}
          </h3>

          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleCategory}
            name="category"
          >
            <option value="default">Rubro</option>
            {category?.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
          <br />
          {companyInput.category.length ? (
            <h2 className="text-lg dark:text-gray-300">
              Rubros seleccionados:{" "}
            </h2>
          ) : null}
          {companyInput.category.map((cat, i) => {
            return (
              <div key={i}>
                <button
                  className="bg-gray-300 dark:bg-gray-800 rounded-3xl px-2 py-1 m-1 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500"
                  onClick={handleDelCategory}
                  value={cat}
                >
                  {cat}
                </button>
              </div>
            );
          })}
          <h3
            className="text-red-600"
            style={{ visibility: error.category ? "visible" : "hidden" }}
          >
            {error.category}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Telefono:{" "}
          </h2>
          <span>{state?.code}</span>

          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="tel"
            placeholder="Telefono"
            name="phone"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.phone ? "visible" : "hidden" }}
          >
            {error.phone}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Email:{" "}
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Email de la empresa"
            name="email"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.email ? "visible" : "hidden" }}
          >
            {" "}
            {error.email}{" "}
          </h3>

          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="text"
            placeholder="Repite el email"
            name="emailRep"
            onPaste="return false"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.emailRep ? "visible" : "hidden" }}
          >
            {" "}
            {error.emailRep}{" "}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Contraseña
          </h2>

          <div className="flex justify-center text-center">
            <input className="h-8 rounded-3xl px-2 mt-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            type="password"
            id="password1"
            placeholder="Contraseña..."
            name="password"
            value={companyInput.password}/>
            <button className="absolute z-50 flex items-center justify-center ml-40 mt-4"
              type="button"
              onClick={handlePass1}>
              <CgEye/>
            </button>
          </div>
          
          <h3
            className="text-red-600"
            style={{ visibility: error.password ? "visible" : "hidden" }}
          >
            {error.password}
          </h3>
          <div className="flex justify-center text-center">
            <input className="h-8 rounded-3xl px-2 mt-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              onChange={handleInputs}
              type="password"
              id="password2"
              placeholder="Contraseña..."
              name="passwordRep"
              value={companyInput.passwordRep}/>
            <button className="absolute z-50 flex items-center justify-center ml-40 mt-4"
              type="button"
              onClick={handlePass2}>
              <CgEye/>
            </button>
          </div>
          <h3
            className="text-red-600"
            style={{ visibility: error.passwordRep ? "visible" : "hidden" }}
          >
            {error.passwordRep}
          </h3>

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300">
            Descripción
          </h2>
          <textarea
            className="rounded-3xl px-2 py-1 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            onChange={handleInputs}
            placeholder="Añade una descripción de tu empresa..."
            name="description"
            cols="28"
            rows="8"
          />
          <h3
            className="text-red-600"
            style={{ visibility: error.description ? "visible" : "hidden" }}
          >
            {error.description}
          </h3>

          <div className="border-t-2 border-light-1 dark:border-light-1" />

          <button
            className="bg-light-1 font-topmodern rounded-3xl p-2 my-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
            style={
              isSubmitDisabled
                ? { opacity: "0.6", cursor: "not-allowed" }
                : null
            }
            disabled={isSubmitDisabled}
            type="submit"
          >
            REGISTRARME
          </button>
          <h3
            className="text-red-600"
            style={{
              visibility: globalErrors?.CREATE_COMPANY?.error
                ? "visible"
                : "hidden",
            }}
          >
            {globalErrors?.CREATE_COMPANY?.error}
          </h3>
        </form>

        <NavLink to="/register-user">
          <button className="bg-gray-300 font-topmodern dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1">
            Registrarme como Usuario
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterCompany;
