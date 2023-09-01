import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { getCountry, getState, getCity } from "../../Redux/Actions/Actions";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries);
  const state = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);

  console.log("city", city);

  const [companyInput, setCompanyInput] = useState({
    nombre: "",
    apellido: "",
    cargo: "",
    nombreEmpresa: "",
    telefono: "",
    email: "",
    contraseña: "",
    contraseñaRepetida: "",
    descripcion: "",
    location: { country: "", state: "", city: "" },
  });

  console.log(companyInput.location);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getCountry());
  }, []);

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

  const handleLocation = (event) => {
    event.preventDefault();
    setCompanyInput({
      ...companyInput,
      location: {
        ...companyInput.location,
        [event.target.name]: event.target.value,
      },
    });
    if (companyInput.location.country !== "undefined") {
      console.log("evento", event.target.value);
      console.log("evento", event.target.name);

      dispatch(getState(event.target.value));
    }
    if (companyInput.location.state !== "undefined") {
      dispatch(getCity(companyInput.location.state));
    }
  };

  const isSubmitDisabled = Object.keys(error).length > 0;

  const handleSubmit = () => {
    dispatch(createCompany());
    alert("registro con exito");
    setCompanyInput({
      nombre: "",
      apellido: "",
      cargo: "",
      nombreEmpresa: "",
      capacitacion: "",
      telefono: "",
      email: "",
      contraseña: "",
      contraseñaRepetida: "",
      descripcion: "",
      location: {},
    });
    navigate("/login");
  };

  return (
    <div className="inline-block m-4 p-4">
      <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 my-4">
        <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800">Registrarme como empresa</h1>

        <form onSubmit={(event) => handleSubmit(event)}>
          <h2>Nombre:</h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Escribe tu nombre"
            name="nombre"/>
          <p className="text-red-600" style={{ visibility: error.nombre ? "visible" : "hidden" }}>
            {error.nombre}
          </p>

          <h2>Apellido: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Escribe tu apellido"
            name="apellido"/>
          <p className="text-red-600" style={{ visibility: error.apellido ? "visible" : "hidden" }}>
            {error.apellido}
          </p>

          <h2>Cargo: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Cargo"
            name="cargo"/>
          <p className="text-red-600" style={{ visibility: error.cargo ? "visible" : "hidden" }}>
            {error.cargo}
          </p>

          <h2>Empresa: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Nombre de la Empresa"
            name="nombreEmpresa"/>
          <p className="text-red-600" style={{ visibility: error.nombreEmpresa ? "visible" : "hidden" }}>
            {error.nombreEmpresa}
          </p>

          <h2>Rubro de capacitación: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Rubro de la capacitación"
            name="capacitacion"/>
          <p className="text-red-600" style={{ visibility: error.capacitacion ? "visible" : "hidden" }}>
            {error.capacitacion}
          </p>

          <h2>Telefono: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="tel"
            placeholder="Telefono"
            name="telefono"/>
          <p className="text-red-600" style={{ visibility: error.telefono ? "visible" : "hidden" }}>
            {error.telefono}
          </p>

          <h2>Email: </h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="text"
            placeholder="Email de la empresa..."
            name="email"/>
          <p className="text-red-600" style={{ visibility: error.email ? "visible" : "hidden" }}>
            {error.email}
          </p>

          <h2>Contraseña</h2>
          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="password"
            placeholder="Contraseña..."
            name="contraseña"/>
          <p className="text-red-600" style={{ visibility: error.contraseña ? "visible" : "hidden" }}>
            {error.contraseña}
          </p>

          <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            type="password"
            placeholder="Repite la Contraseña..."
            name="contraseñaRepetida"
          />
          <p className="text-red-600" style={{visibility: error.contraseñaRepetida ? "visible" : "hidden",}}>
            {error.contraseñaRepetida}
          </p>
          
          <select className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onClick={handleLocation}
            name="country">
            <option value="default">pais</option>
            {country.map((p) => {
              return <option value={p}>{p}</option>;
            })}
          </select>

          <select className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleLocation}
            name="state">
            <option value="default">estado</option>
            {state.stateName?.map((p) => {
              return <option value={p}>{p}</option>;
            })}
          </select>

          <select className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleLocation}
            name="city">
            <option value="default">ciudad</option>
            {city?.map((p) => {
              return <option value={p}>{p}</option>;
            })}
          </select>

          <h2>Descripción</h2>
          <textarea className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            onChange={handleInputs}
            placeholder="Añade una descripción de tu empresa..."
            name="descripcion"
            cols="20"
            rows="8"/>
          <p className="text-red-600" style={{ visibility: error.descripcion ? "visible" : "hidden" }}>
            {error.descripcion}
          </p>

          <button className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
            disabled={isSubmitDisabled}
            type="submit">
            Enviar
          </button>
        </form>

        <NavLink to="/login">
          <button className="bg-zinc-300 mt-2 text-black rounded-3xl p-2">Ya tengo cuenta</button>
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterCompany;
