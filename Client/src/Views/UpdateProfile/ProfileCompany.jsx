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
  const profilePicture = localStorage.profilePicture;
  const country = useSelector((state) => state.countries);
  const state = useSelector((state) => state.states);
  const city = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const globalErrors = useSelector((state) => state.errors);
  const trainings = useSelector((state) => state.trainings);
  const offers = useSelector((state) => state.offers);

  const categories = account?.areaTrainings?.map((c) => c.name);

  const companyIdRelacion = trainings.filter((x) => x.companyId === account.id);
  const companyIdRelOffer = offers.filter((x) => x.companyId === account.id);

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
    profilePicture: profilePicture
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

  return (
    <div className="h-full flex ">
      <div className="flex flex-col text-center border-spacing-96 border-2 border-light-1 dark:borderlight-1 rounded-3xl p-4 m-4">
        <img key={key} src={account.profilePicture} className="w-[300px] mt-2 mx-2 rounded-full" />

        <h2 className="font-topmodern">{input.nameCompany}</h2>

        {edit === true ? (
          <div>
            <UploadImage />
              <button
                className="font-topmodern border-2 rounded border-light-1 bg-light-1 hover:text-white"
                onClick={handleSubmit}
              >
                Guardar imagen
              </button>
            <span className="font-topmodern">Nombre</span>
            <input
              className=" font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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

            <span className="font-topmodern">Apellido</span>
            <input
              className="font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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

            <span className="font-topmodern">Cargo</span>
            <input
              className="font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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

            <span className="font-topmodern">Empresa</span>
            <input
              className="font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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

            <select
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
              onChange={handleLocation}
              name="state"
            >
              <option value="default">Estado</option>
              {state.allStates?.map((p) => {
                return (
                  <option key={p.id} id={p.id} value={p.name}>
                    {p.name}
                  </option>
                );
              })}
            </select>
            <br />
            <select
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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
            <br />
            <span className="font-topmodern">Ubicacion:</span>
            <div className="p-2 m-auto bg-zinc-300 text-zinc-800 focus:border-transparent w-[200px] justify-center align-middle rounded-3xl">
              <div className=" font-vilaka text-[22px] font-bold text-center bg-zinc-400 mb-1 rounded-3xl">
                {input.location.country}
              </div>
              <div className=" font-vilaka text-[22px] font-bold text-center bg-zinc-400 mb-1 rounded-3xl">
                {input.location.state}
              </div>
              <div className=" font-vilaka text-[22px] font-bold text-center bg-zinc-400 mb-1 rounded-3xl">
                {input.location.city}
              </div>
            </div>
            <p
              className="text-red-600"
              style={{ visibility: error.location ? "visible" : "hidden" }}
            >
              {error.location}
            </p>

            <select
              className="rounded-3xl px-2 mb-2 mt-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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
            <span className="font-topmodern">Rubros seleccionados: </span>
            <div className="p-2 m-auto bg-zinc-300 text-zinc-800 focus:border-transparent w-[200px] justify-center align-middle rounded-3xl">
              {input?.category?.map((cat) => {
                return (
                  <div className="text-center bg-zinc-400 mb-1 rounded-3xl">
                    {cat}
                    <button
                      className="bg-red-600 px-1 text-white h-[20px] m-auto rounded-3xl"
                      onClick={(e) => handleDelCategory(e)}
                      value={cat}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
            <p
              className="text-red-600"
              style={{ visibility: error.category ? "visible" : "hidden" }}
            >
              {error.category}
            </p>

            <span className="font-topmodern">Telefono</span>
            <input
              className=" font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 mt-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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

            <span className="font-topmodern">Descripción</span>
            <br />
            <textarea
              className=" font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
              onChange={handleChange}
              value={input.description}
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
              className="bg-light-1 font-topmodern mt-2 hover:text-white text-black rounded-3xl p-1"
              onClick={(event) => handleSubmit(event)}
              type="submit"
            >
              Guardar
            </button>

            <button
              className="bg-zinc-300 font-topmodern hover:text-light-1 ml-2 mt-2 text-black rounded-3xl p-1"
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
            className=" border-2 border-light-1 hover:text-light-1 font-topmodern mb-2 mt-2 text-black rounded-3xl p-1"
            onClick={() => handleEdit()}
          >
            Editar perfil
          </button>
        )}
      </div>
      <div className="block ">
        <div className="w-8/12 font-topmodern  inline-block">
          {input.description}
        </div>
        <div className=" inline-block">
          <h2 className="font-bold">Mis capacitaciones</h2>
          {companyIdRelacion? (
            <div className="flex flex-wrap ">
              {companyIdRelacion.map((t) => {
                return (
                  <div className=" mx-1 border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div>
                      {t.name}
                      <div className="flex justify-center">
                        <video
                          src={t.video[0]}
                          controls
                          width="200"
                          height="150"
                        ></video>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span>No hay capacitaciones creadas todavia</span>
            </div>
          )}
          <NavLink to="/create-trainings">
            <button className=" border-2 border-light-1 hover:text-light-1 font-topmodern mb-2 mt-2 text-black rounded-3xl p-1">
              Crear
            </button>
          </NavLink>
        </div>
        <div className=" inline-block">
          <h2 className="font-bold">Mis ofertas de trabajo</h2>
          {companyIdRelOffer? (
            <div className="flex flex-wrap justify-center">
              {companyIdRelOffer.map((o) => {
                return (
                  <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div>
                      {o.title}
                      <br />
                      {o.description}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span>No hay ofertas de trabajo todavia</span>
            </div>
          )}
          <NavLink to="/create-jobs">
            <button className=" border-2 border-light-1 hover:text-light-1 font-topmodern mb-2 mt-2 text-black rounded-3xl p-1">
              Crear
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompany;
