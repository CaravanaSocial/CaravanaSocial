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

  const isSubmitDisabled = Object.keys(error).length > 0;

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
        email: companyInput.email,
        password: companyInput.passwordRep,
        description: companyInput.description,
        location: companyInput.location,
      })
    ).then((postError) => {
      if (!postError) {
        setCompanyInput({
          name: "",
          lastName: "",
          position: "",
          nameCompany: "",
          category: [],
          phone: "",
          email: "",
          password: "",
          passwordRep: "",
          description: "",
          location: { country: "", state: "", city: "" },
        });
        navigate("/login");
        dispatch(clearErrors());
      } else {
        dispatch(
          setNewErrors({
            type: "CREATE_COMPANY",
            error: postError.response.data,
          })
        );
      }
    });
  };

  return (
      <div className="flex justify-center">
        <div className="justify-center text-center border-spacing-96 border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
          <h1 className="text-3xl border-b-2 border-lime-600 dark:border-lime-700 dark:text-gray-300">
            Registrarme como empresa
          </h1>

          <form onSubmit={handleSubmit}>
            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Nombre: </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="text"
              placeholder="Escribe tu nombre"
              name="name"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.name ? "visible" : "hidden" }}
            >
              {error.name}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Apellido: </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="text"
              placeholder="Escribe tu apellido"
              name="lastName"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.lastName ? "visible" : "hidden" }}
            >
              {error.lastName}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Cargo: </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="text"
              placeholder="Cargo"
              name="position"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.position ? "visible" : "hidden" }}
            >
              {error.position}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Empresa: </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="text"
              placeholder="Nombre de la Empresa"
              name="nameCompany"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.nameCompany ? "visible" : "hidden" }}
            >
              {error.nameCompany}
            </p>

            <select
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleLocation}
              name="country"
            >
              <option value="default">pais</option>
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
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleLocation}
              name="state"
            >
              <option value="default">estado</option>
              {state.allStates?.map((p) => {
                return (
                  <option key={p.id} id={p.id} value={p.name}>
                    {p.name}
                  </option>
                );
              })}
            </select>

            <select
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              name="city"
              onChange={handleLocation}
            >
              <option value="default">ciudad</option>
              {city?.map((p) => {
                return (
                  <option key={p} value={p}>
                    {p}
                  </option>
                );
              })}
            </select>
            <p
              className="text-red-600"
              style={{ visibility: error.location ? "visible" : "hidden" }}
            >
              {error.location}
            </p>

            <select
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleCategory}
              name="category"
            >
              <option value="default">rubro</option>
              {category?.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
            <br />
            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Rubros seleccionados: </h2>
              {companyInput.category.map((cat, i) => {
                return (
                  <div key={i}>
                    <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-1 m-1 dark:text-gray-300 hover:bg-red-500"
                    onClick={handleDelCategory}
                    value={cat}
                    >{cat}
                    </button>
                  </div>
                );
              })}
            <p
              className="text-red-600"
              style={{ visibility: error.category ? "visible" : "hidden" }}
            >
              {error.category}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Telefono: </h2>
            <span>{state.code}</span>

            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="tel"
              placeholder="Telefono"
              name="phone"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.phone ? "visible" : "hidden" }}
            >
              {error.phone}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Email: </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="text"
              placeholder="Email de la empresa..."
              name="email"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.email ? "visible" : "hidden" }}
            >
              {error.email}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Contraseña</h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="password"
              placeholder="Contraseña..."
              name="password"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.password ? "visible" : "hidden" }}
            >
              {error.password}
            </p>

            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              type="password"
              placeholder="Repite la Contraseña..."
              name="passwordRep"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.passwordRep ? "visible" : "hidden" }}
            >
              {error.passwordRep}
            </p>

            <h2 className="text-lg dark:border-lime-700 dark:text-gray-300">Descripción</h2>
            <textarea
              className="rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleInputs}
              placeholder="Añade una descripción de tu empresa..."
              name="description"
              cols="20"
              rows="8"
            />
            <p
              className="text-red-600"
              style={{ visibility: error.description ? "visible" : "hidden" }}
            >
              {error.description}
            </p>

            <button
              className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 mr-1 mt-1 dark:text-gray-300"
              style={
                isSubmitDisabled
                  ? { opacity: "0.6", cursor: "not-allowed" }
                  : null
              }
              disabled={isSubmitDisabled}
              type="submit"
            >
              Enviar
            </button>
          </form>

          <NavLink to="/login">
            <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 mr-1 mt-1 dark:text-gray-300">
              Ya tengo cuenta
            </button>
          </NavLink>
          <p
            className="text-red-600"
            style={{
              visibility: globalErrors?.CREATE_COMPANY?.error
                ? "visible"
                : "hidden",
            }}
          >
            {globalErrors?.CREATE_COMPANY?.error}
          </p>
        </div>
      </div>
  );
};

export default RegisterCompany;
