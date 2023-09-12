import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCountry,
  getState,
  getCity,
  editCompany,
  clearErrors,
  setNewErrors,
  getTrainings,
  getOffers,
} from "../../Redux/Actions/Actions";
import validation from "../RegisterCompany/validation";
import { NavLink } from "react-router-dom";
import UploadImage from "../../components/UploadImage";

const ProfileCompany = () => {
  const dispatch = useDispatch();
  const account = JSON.parse(localStorage.account);
  const accountId = localStorage.accId;
  const profilePicture = localStorage.profilePicture;
  const country = useSelector((state) => state.countries);
  const state = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const globalErrors = useSelector((state) => state.errors);
  const trainings = useSelector((state) => state.trainings);
  const offers = useSelector((state) => state.offers);
  const [image, setImage] = useState(false);

  const handleImage = () => {
    setImage(image === true ? false : true);
  };

  const categories = account?.areaTrainings?.map((c) => c.name);

  const companyIdRelacion = trainings.filter((x) => x.companyId === accountId);
  const companyIdRelOffer = offers.filter((x) => x.companyId === accountId);

  const [edit, setEdit] = useState(false);
  const [error, setError] = useState({});
  const [key, setKey] = useState(0);

  const [input, setInput] = useState({
    name: account.name,
    lastName: account.lastName,
    position: account.position,
    nameCompany: account.nameCompany,
    category: categories,
    phone: account.phone,
    profilePicture: account.profilePicture,
    description: account.description,
    location: {
      country: account.location.country,
      state: account.location.state,
      city: account.location.city,
    },
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOffers());
    dispatch(getTrainings());
    dispatch(getCountry());
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const validateInput = (inputData) => {
    const errors = validation(inputData);
    setError(errors);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleCategory = (event) => {
    event.preventDefault();
    const rep = input.category?.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setInput({
        ...input,
        category: [...input.category, event.target.value],
      });
      validateInput({
        ...input,
        category: [...input.category, event.target.value],
      });
    }
  };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = input.category.filter(
      (cat) => cat !== event.target.value
    );
    setInput({
      ...input,
      category: filteredCat,
    });
    validateInput({
      ...input,
      category: filteredCat,
    });
  };

  const handleLocation = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "country") {
      setInput({
        ...input,
        location: { ...input.location, [name]: value },
      });
      setError(
        validation({
          ...input,
          location: { ...input.location, [name]: value },
        })
      );
      dispatch(getState(value));
    } else if (name === "state") {
      setInput({
        ...input,
        location: { ...input.location, [name]: value },
      });
      setError(
        validation({
          ...input,
          location: { ...input.location, [name]: value },
        })
      );
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setInput({
        ...input,
        location: { ...input.location, [name]: value },
      });
      setError(
        validation({
          ...input,
          location: { ...input.location, [name]: value },
        })
      );
    }
  };

  // const isSubmitDisabled = Object.keys(error).length > 0;
  const handleSubmit = (event) => {
    dispatch(editCompany(localStorage.accId, input)).then((updateError) => {
      if (!updateError) {
        setEdit(false);
        dispatch(clearErrors());
        const editedAccount = JSON.stringify(input);
        localStorage.setItem("account", editedAccount);
        setKey(key + 1);
        dispatch(getOffers());
        dispatch(getTrainings());
      } else {
        dispatch(
          setNewErrors({
            type: "EDIT_COMPANY",
            error: updateError.response.data,
          })
        );
      }
    });
  };

  const handleSaveImage = () => {
    setEdit(false);
    setKey(key + 1);
  };

  return (
    <div className="h-full">
      <div className="flex">
        <div className="block text-center border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 m-4">
          <img
            key={key}
            src={profilePicture}
            className="inline-block w-72 rounded-full border-2 border-light-1 dark:border-light-1 mb-2"
          />
          <h2 className="font-topmodern">{input.nameCompany}</h2>

          {edit === true ? (
            <div>
              <button
                className="bg-gray-300 dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300 mb-2 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1"
                onClick={handleImage}
              >
                Editar imagen de perfil
              </button>

              {image === true ? (
                <div>
                  <UploadImage />
                  <button
                    className="bg-gray-300 dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300 mb-2 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1"
                    onClick={handleSaveImage}
                  >
                    Guardar imagen
                  </button>
                </div>
              ) : null}

              <h2 className="font-topmodern">Nombre</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.name}
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

              <h2 className="font-topmodern">Apellido</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.lastName}
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

              <h2 className="font-topmodern">Cargo</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.position}
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

              <h2 className="font-topmodern">Empresa</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.nameCompany}
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

              <h2 className="font-topmodern">Localizacion</h2>
              <select
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleLocation}
                name="country"
              >
                <option value="default">{account.location.country}</option>
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
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleLocation}
                name="state"
              >
                <option value="default">{account.location.state}</option>
                {state?.allStates?.map((p) => {
                  return (
                    <option key={p.id} id={p.id} value={p.name}>
                      {p.name}
                    </option>
                  );
                })}
              </select>
              <br />
              <select
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                name="city"
                onChange={handleLocation}
              >
                <option value="default">{account.location.city}</option>
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
              {input.category.length ? (
                <h2 className="text-lg dark:text-gray-300">
                  Rubros seleccionados:{" "}
                </h2>
              ) : null}
              {input.category.map((cat, i) => {
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
              <p
                className="text-red-600"
                style={{ visibility: error.category ? "visible" : "hidden" }}
              >
                {error.category}
              </p>

              <h2 className="font-topmodern">Telefono</h2>
              <input
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.phone}
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

              <h2 className="font-topmodern">Descripción</h2>
              <br />
              <textarea
                className="rounded-3xl px-2 py-1 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                onChange={handleChange}
                value={input.description}
                placeholder="Añade una descripción de tu empresa..."
                name="description"
                cols="28"
                rows="8"
              />
              <p
                className="text-red-600"
                style={{ visibility: error.description ? "visible" : "hidden" }}
              >
                {error.description}
              </p>

              <button
                className="bg-light-1 font-topmodern rounded-3xl p-2 mr-1 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
                onClick={(event) => handleSubmit(event)}
                type="submit"
              >
                Guardar
              </button>

              <button
                className="bg-gray-300 dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300 ml-1 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1"
                onClick={handleCancel}
              >
                Cancelar
              </button>

              <p
                className="text-red-600"
                style={{
                  visibility: globalErrors?.EDIT_COMPANY?.error
                    ? "visible"
                    : "hidden",
                }}
              >
                {globalErrors?.EDIT_COMPANY?.error}
              </p>
            </div>
          ) : (
            <button
              className="bg-light-1 font-topmodern rounded-3xl p-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
              onClick={() => handleEdit()}
            >
              Editar perfil
            </button>
          )}
        </div>

        <div className="block">
          <div className="my-4 mr-4 border-2 rounded-3xl border-light-1 dark:border-light-1">
            <div className="flex justify-between m-2">
              <h1 className="text-xl bg-gray-300 dark:bg-gray-800 rounded-3xl px-2 pb-2 pt-1 dark:text-gray-300">
                Mis capacitaciones
              </h1>

              <NavLink to="/create-trainings">
                <button 
                  className="bg-light-1 font-topmodern rounded-3xl px-2 pb-1 pt-1 ml-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95">
                  Crear
                </button>
              </NavLink>
            </div>

            <div className="m-2">
              {companyIdRelacion.length ? (
                <div className="flex flex-wrap">
                  {companyIdRelacion.map((t) => {
                    return (
                      <div className="flex justify-center">
                        <div className="text-center m-1 border-2 border-light-1 dark:border-light-1 hover:scale-95 p-4 rounded-3xl w-[300px]">
                          <h2 className="text-xl border-b-2 border-light-1 dark:border-light-1 mb-2">
                            {t.name}
                          </h2>
                          <div>
                            <video
                              className="inline-block border-2 border-light-1 dark:border-light-1 rounded-3xl"
                              src={t.video[0]}
                              controls
                              width="200"
                              height="150"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <h1>No hay capacitaciones creadas todavia.</h1>
                </div>
              )}
            </div>
          </div>

          <div className="my-4 mr-4 border-2 rounded-3xl border-light-1 dark:border-light-1">
            <div className="flex justify-between m-2">
              <h1 className="text-xl bg-gray-300 dark:bg-gray-800 rounded-3xl px-2 pb-2 pt-1 dark:text-gray-300">
                Mis ofertas de trabajo
              </h1>

              <NavLink to="/create-jobs">
                <button 
                  className="bg-light-1 font-topmodern rounded-3xl px-2 pb-1 pt-1 ml-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95">
                  Crear
                </button>
              </NavLink>
            </div>

            <div className="m-2">
              {companyIdRelOffer.length ? (
                <div className="flex flex-wrap">
                  {companyIdRelOffer.map((o) => {
                    return (
                      <div className="flex justify-center">
                        <div className="text-center m-1 border-2 border-light-1 dark:border-light-1 hover:scale-95 p-4 rounded-3xl w-[300px]">
                          <h2 className="text-xl border-b-2 border-light-1 dark:border-light-1 mb-2">
                            {o.title}
                          </h2>
                          <h2 className="text-xl">Descripcion:</h2>
                          <h3 className="text-lg">{o.description}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <h1>No hay trabajos creados todavia.</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompany;
