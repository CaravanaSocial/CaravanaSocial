import { useState, useEffect } from "react";
import validation from "./validation";
import { Link, useNavigate } from "react-router-dom";
import {
  createUser,
  getCountry,
  getCity,
  getState,
  clearErrors,
  setNewErrors,
  getCategories,
} from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterUser() {
  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = useSelector((state) => state.countries);
  const state = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const globalErrors = useSelector((state) => state.errors);
  const [checkboxCUD, setCheckboxCUD] = useState(null);
  const [checkboxFreelancer, setCheckboxFreelancer] = useState(null);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    location: { country: "", city: "", state: "" },
    CUD: "",
    category: [],
    email: "",
    password: "",
    passwordRep: "",
    certificates: "",
    freelancer: false,
    description: "",
    address: "",
  });

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCategories());
  }, []);

  const handleCheckboxCUDChange = (checkbox) => {
    setCheckboxCUD(checkbox);
    if (checkbox === "NO") {
      delete errors.CUD;
    }
    if (checkbox === "SI") {
      errors.CUD = "Debe ingresar su código CUD";
    }
  };

  const handleCheckboxFreeChange = (checkbox) => {
    setCheckboxFreelancer(checkbox);
    if (checkbox === "NO") {
      setUserData({
        ...userData,
        freelancer: false,
      });
      delete errors.description;
      delete errors.address;
    }
    if (checkbox === "SI") {
      setUserData({
        ...userData,
        freelancer: true,
      });
      errors.description = "Debe ingresar una descripción de su trabajo";
      errors.address = "Debe ingresar su geolocalización";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      setUserData({
        ...userData,
        location: { ...userData.location, [name]: value },
      });
      setErrors(
        validation({
          ...userData,
          location: { ...userData.location, [name]: value },
        })
      );
      dispatch(getState(value));
    } else if (name === "state") {
      setUserData({
        ...userData,
        location: { ...userData.location, [name]: value },
      });
      setErrors(
        validation({
          ...userData,
          location: { ...userData.location, [name]: value },
        })
      );
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setUserData({
        ...userData,
        location: { ...userData.location, [name]: value },
      });
      setErrors(
        validation({
          ...userData,
          location: { ...userData.location, [name]: value },
        })
      );
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
      setErrors(
        validation({
          ...userData,
          [name]: value,
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createUser({
        name: userData.name,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        location: userData.location,
        CUD: userData.CUD,
        category: userData.category,
        email: userData.email,
        password: userData.passwordRep,
        certificates: userData.certificates,
        freelancer: userData.freelancer,
        description: userData.description,
        address: userData.address,
      })
    ).then((postError) => {
      if (!postError) {
        navigate("/login");
        dispatch(clearErrors());
      } else {
        dispatch(
          setNewErrors({ type: "CREATE_USER", error: postError.response.data })
        );
      }
    });
  };

  const handleCategory = (event) => {
    const rep = userData.category.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setUserData({
        ...userData,
        category: [...userData.category, event.target.value],
      });
      event.target.value = "default";
      validateInput({
        ...userData,
        category: [...userData.category, event.target.value],
      });
    }
    event.target.value = "default";
  };

  const validateInput = (companyInputData) => {
    const errors = validation(companyInputData);
    setErrors(errors);
  };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = userData.category.filter(
      (cat) => cat !== event.target.value
    );
    setUserData({
      ...userData,
      category: filteredCat,
    });
    validateInput({ ...userData, category: filteredCat });
  };

  return (
    <div className="flex justify-center">
      <div className="justify-center text-center border-spacing-96 border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
        <h1 className="text-3xl mb-1 dark:text-gray-300">
          Registrarme como Usuario
        </h1>

        <div className="border-t-2 border-lime-600 dark:border-lime-700" />

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg dark:text-gray-300">Nombre</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="text"
            name="name"
            placeholder="nombre"
            value={userData.name}
            onChange={handleChange}
          />
          <h3 className="text-red-600">{errors.name ? errors.name : null}</h3>

          <h2 className="text-lg dark:text-gray-300">Apellido</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="text"
            name="lastName"
            placeholder="apellido"
            value={userData.lastName}
            onChange={handleChange}
          />
          <h3 className="text-red-600">
            {errors.lastName ? errors.lastName : null}
          </h3>

          <h2 className="text-lg dark:text-gray-300">Fecha de Nacimiento</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="date"
            name="birthDate"
            value={userData.birthDate}
            onChange={handleChange}
          />
          <h3 className="text-red-600">
            {errors.birthDate ? errors.birthDate : null}
          </h3>

          <h2 className="text-lg dark:text-gray-300">País</h2>
          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            onChange={handleChange}
            name="country"
          >
            <option value="default">Seleccioná un país...</option>
            {country.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <h3 className="text-red-600">
            {errors.country ? errors.country : null}
          </h3>

          <h2 className="text-lg dark:text-gray-300">Estado/Provincia</h2>
          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            onChange={handleChange}
            name="state"
          >
            <option value="default">Seleccioná un Estado/Provincia...</option>
            {state.allStates?.map((s) => (
              <option key={s.id} id={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <h3 className="text-red-600">{errors.state ? errors.state : null}</h3>

          <h2 className="text-lg dark:text-gray-300">Ciudad</h2>
          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            onChange={handleChange}
            name="city"
          >
            <option value="default">Seleccioná una Ciudad...</option>
            {city.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <h3 className="text-red-600">{errors.city ? errors.city : null}</h3>

          <h2 className="text-lg dark:text-gray-300">
            Tenes Certificado Único de Discapacidad (CUD)?
          </h2>
          <label>
            {" "}
            Si{" "}
            <input
              type="checkbox"
              checked={checkboxCUD === "SI"}
              onChange={() => handleCheckboxCUDChange("SI")}
            />
          </label>
          <label>
            {" "}
            No{" "}
            <input
              type="checkbox"
              checked={checkboxCUD === "NO"}
              onChange={() => handleCheckboxCUDChange("NO")}
            />
          </label>

          {checkboxCUD === "SI" ? (
            <section>
              <h2 className="text-lg dark:text-gray-300">Código CUD</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
                type="text"
                name="CUD"
                value={userData.CUD}
                onChange={handleChange}
                placeholder="CODIGO CUD..."
              />
              <h3 className="text-red-600">{errors.CUD ? errors.CUD : null}</h3>
            </section>
          ) : null}

          <h2 className="text-lg dark:text-gray-300">Email</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="email"
            name="email"
            placeholder="email"
            value={userData.email}
            onChange={handleChange}
          />
          <h3 className="text-red-600">{errors.email ? errors.email : null}</h3>

          <h2 className="text-lg dark:text-gray-300">Contraseña</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="password"
            name="password"
            placeholder="contraseña"
            value={userData.password}
            onChange={handleChange}
          />
          <h3 className="text-red-600">
            {errors.password ? errors.password : null}
          </h3>

          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="password"
            name="passwordRep"
            placeholder="repetir contraseña"
            value={userData.passwordRep}
            onChange={handleChange}
          />
          <h3 className="text-red-600">
            {errors.passwordRep ? errors.passwordRep : null}
          </h3>

          <h2 className="text-lg dark:text-gray-300">
            Tipo/s de Preferencia/s
          </h2>
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
          {userData.category.length ? (
            <h2 className="text-lg dark:text-gray-300">
              Rubros seleccionados:{" "}
            </h2>
          ) : null}
          {userData.category.map((cat, i) => {
            return (
              <div key={i}>
                <button
                  className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-1 m-1 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500"
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
            style={{ visibility: errors.category ? "visible" : "hidden" }}
          >
            {errors.category}
          </h3>

          <h2 className="text-lg dark:text-gray-300">
            Certificados (Opcional)
          </h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="url"
            name="certificates"
            value={userData.certificates}
            onChange={handleChange}
          />

          <h2 className="text-lg dark:text-gray-300">Sos Freelancer?</h2>
          <label>
            {" "}
            Si{" "}
            <input
              type="checkbox"
              checked={checkboxFreelancer === "SI"}
              onChange={() => handleCheckboxFreeChange("SI")}
            />
          </label>
          <label>
            {" "}
            No{" "}
            <input
              type="checkbox"
              checked={checkboxFreelancer === "NO"}
              onChange={() => handleCheckboxFreeChange("NO")}
            />
          </label>

          {checkboxFreelancer === "SI" ? (
            <section>
              <h2 className="text-lg dark:text-gray-300">
                Descripción de tu Emprendimiento
              </h2>
              <textarea
                className="rounded-3xl px-2 py-1 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
                type="text"
                name="description"
                placeholder="añadir descripcion"
                value={userData.description}
                onChange={handleChange}
                cols="20"
                rows="8"
              />
              <h3 className="text-red-600">
                {errors.description ? errors.description : null}
              </h3>

              <h2 className="text-lg dark:text-gray-300">
                Dirección de su negocio{" "}
              </h2>
              <input
                className="rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
              <h3 className="text-red-600">
                {errors.address ? errors.address : null}
              </h3>
            </section>
          ) : null}

          <div className="border-t-2 border-lime-600 dark:border-lime-700" />

          <button
            className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 my-2 dark:text-gray-300"
            type="submit"
          >
            REGISTRARME
          </button>

          <br />

          <Link to={"/register-company"}>
            <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300">
              Registrarme como Empresa
            </button>
          </Link>

          <h3
            className="text-red-600"
            style={{
              visibility: globalErrors?.CREATE_USER?.errors
                ? "visible"
                : "hidden",
            }}
          >
            {globalErrors?.CREATE_USER?.errors}
          </h3>
        </form>
      </div>
    </div>
  );
}
