import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import validation from "../UpdateProfile/validation";
import UploadImage from "../../components/UploadImage";
import {
  getCountry,
  getState,
  getCity,
  getCategories,
  editUser,
  getTrainingsUser,
} from "../../Redux/Actions/Actions";
import NotFound from "../../components/NotFound";

export default function ProfileUser() {
  const account =
    localStorage.length !== 0 ? JSON?.parse(localStorage?.account) : null;
  const profilePicture =
    localStorage.length !== 0 ? localStorage.profilePicture : null;

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const trainingsUser = useSelector((state) => state.trainingsUser);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [key, setKey] = useState(0);
  const categories = account?.areaTrainings?.map((c) => c.name);
  const [dataAcc, setDataAcc] = useState({
    id: account?.id,
    activate: account?.activate,
    email: account?.email,
    birthDate: account?.birthDate,
    name: account?.name,
    lastName: account?.lastName,
    location: {
      country: account?.location.country,
      city: account?.location.city,
      state: account?.location.state,
    },
    CUD: account?.CUD,
    category: categories,
    certificates: account?.certificates,
    freelancer: account?.freelancer,
    description: account?.description,
    address: account?.address,
    profilePicture: profilePicture,
  });
  const [checkboxFreelancer, setCheckboxFreelancer] = useState(
    account?.freelancer
  );
  const [image, setImage] = useState(false);

  const handleImage = () => {
    setImage(image === true ? false : true);
  };

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCategories());
    dispatch(getTrainingsUser(localStorage.accId));
  }, [dataAcc]);

  const handleClick = (event) => {
    if (event.target.name === "edit") {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const handleCheckboxFreeChange = (checkbox) => {
    setCheckboxFreelancer(checkbox);
    if (checkbox === false) {
      setDataAcc({
        ...dataAcc,
        freelancer: false,
      });
      delete errors.description;
      delete errors.address;
    }
    if (checkbox === true) {
      setDataAcc({
        ...dataAcc,
        freelancer: true,
      });
      errors.description = "Debe ingresar una descripción de su trabajo";
      errors.address = "Debe ingresar su geolocalización";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc?.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc?.location, [name]: value },
        })
      );
      dispatch(getState(value));
    } else if (name === "state") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc?.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc?.location, [name]: value },
        })
      );
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc?.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc?.location, [name]: value },
        })
      );
    } else {
      setDataAcc({
        ...dataAcc,
        [name]: value,
      });
      setErrors(
        validation({
          ...dataAcc,
          [name]: value,
        })
      );
    }
    if (Object.keys(errors).length === 1 && errors.password) {
      setErrors({});
    }
  };

  const handleCategory = (event) => {
    const rep = dataAcc.category?.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setDataAcc({
        ...dataAcc,
        category: [...dataAcc.category, event.target.value],
      });
      event.target.value = "default";
      validateInput({
        ...dataAcc,
        category: [...dataAcc.category, event.target.value],
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
    const filteredCat = dataAcc?.category?.filter(
      (cat) => cat !== event.target.value
    );
    setDataAcc({
      ...dataAcc,
      category: filteredCat,
    });
    validateInput({ ...dataAcc, category: filteredCat });
  };

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      dispatch(editUser(account.id, dataAcc));
      const editedAccount = JSON.stringify(dataAcc);
      localStorage.setItem("account", editedAccount);
      setEdit(false);
      setKey(key + 1);
    }
  };

  const handleSaveImage = () => {
    setEdit(false);
    setKey(key + 1);
  };

  return (
    <div className=" flex h-full">
      {localStorage.length !== 0 && localStorage.type === "user" ? (
        <div className="flex justify-center max-lg:flex-col max-lg:bg-light-1 max-lg:items-center dark:max-lg:bg-light-2 ">
          <div className="block text-center p-4   bg-light-1 dark:bg-light-2">
            <img
              key={key}
              className="inline-block w-72 rounded-full border-2 border-light-1 dark:border-light-1 mb-2"
              src={profilePicture}
            />
            <h2 className="font-vilaka font-bold text-[30px] max-lg:text-[50px] dark:font-light">
              {account?.name + " " + account?.lastName}
            </h2>

            {edit === true ? (
              <div>
                <button
                  className="bg-light-2 font-nunito font-bold text-sm dark:bg-light-1 rounded-3xl px-2 py-1 dark:text-black mb-2 border-2 border-transparent hover:border-light-2 dark:hover:border-light-1 dark:font-light"
                  onClick={handleImage}
                >
                  Editar imagen de perfil
                </button>

                {image === true ? (
                  <div>
                    <UploadImage />
                    <button
                      className="bg-light-2 dark:bg-light-1 rounded-3xl px-2 py-1 text-sm font-bold font-nunito  dark:text-black mb-2 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1"
                      onClick={handleSaveImage}
                    >
                      Guardar imagen
                    </button>
                  </div>
                ) : null}

                <h2 className="font-nunito font-bold dark:font-light">
                  Nombre
                </h2>
                <input
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="name"
                  onChange={handleChange}
                  value={dataAcc.name}
                  placeholder="Nombre..."
                />
                <p className="text-red-600">
                  {errors.name ? errors.name : null}
                </p>

                <h2 className="font-nunito font-bold dark:font-light">
                  Apellido
                </h2>
                <input
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="lastName"
                  onChange={handleChange}
                  value={dataAcc.lastName}
                  placeholder="Apellido..."
                />
                <p className="text-red-600">
                  {errors.lastName ? errors.lastName : null}
                </p>

                <h2 className="font-nunito font-bold dark:font-light">
                  Localizacion
                </h2>
                <select
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="country"
                  onChange={handleChange}
                >
                  <option>Pais</option>
                  {countries?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-red-600">
                  {errors.country ? errors.country : null}
                </p>
                <select
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="state"
                  onChange={handleChange}
                >
                  <option>Estado/Provincia</option>
                  {states?.allStates?.map((c) => (
                    <option key={c.name} id={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-600">
                  {errors.state ? errors.state : null}
                </p>
                <select
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="city"
                  onChange={handleChange}
                >
                  <option>Ciudad</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-red-600">
                  {errors.city ? errors.city : null}
                </p>

                <h2 className="font-nunito font-bold dark:font-light">
                  Codigo CUD
                </h2>
                <input
                  className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                  name="CUD"
                  onChange={handleChange}
                  placeholder="CUD..."
                />
                <br />
                <h2 className="font-nunito font-bold dark:font-light">
                  Rubros
                </h2>
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
                {dataAcc?.category?.length ? (
                  <h2 className="text-sm font-bold font-nunito dark:text-gray-300">
                    Rubros seleccionados:{" "}
                  </h2>
                ) : null}
                {dataAcc?.category?.map((cat) => {
                  return (
                    <div key={cat}>
                      <button
                        className="bg-light-2 dark:bg-light-1 rounded-3xl px-2 py-1 m-1 dark:text-black dark:font-bold hover:bg-red-500 dark:hover:bg-red-500"
                        onClick={handleDelCategory}
                        value={cat}
                      >
                        {cat}{" "}
                      </button>
                    </div>
                  );
                })}
                <p
                  className="text-red-600"
                  style={{ visibility: errors.category ? "visible" : "hidden" }}
                >
                  {errors.category}
                </p>

                <h2 className="font-nunito font-bold dark:font-light">
                  Sos Freelancer?
                </h2>
                <label className="font-bold dark:font-light">
                  {" "}
                  Si{" "}
                  <input
                    type="checkbox"
                    checked={checkboxFreelancer === true}
                    onChange={() => handleCheckboxFreeChange(true)}
                  />
                </label>
                <label className="font-bold dark:font-light">
                  {" "}
                  No{" "}
                  <input
                    type="checkbox"
                    checked={checkboxFreelancer === false}
                    onChange={() => handleCheckboxFreeChange(false)}
                  />
                </label>

                {checkboxFreelancer === true ? (
                  <section>
                    <h2 className="font-nunito font-bold dark:font-light">
                      Descripción de tu Emprendimiento
                    </h2>
                    <textarea
                      className="rounded-3xl px-2 py-1 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                      type="text"
                      name="description"
                      placeholder="añadir descripcion"
                      value={dataAcc?.description}
                      onChange={handleChange}
                      cols="28"
                      rows="8"
                    />
                    <p className="text-red-600">
                      {errors.description ? errors.description : null}
                    </p>

                    <h2 className="font-nunito font-bold dark:font-light">
                      Dirección de tu negocio{" "}
                    </h2>
                    <input
                      className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                      type="text"
                      name="address"
                      value={dataAcc?.address}
                      onChange={handleChange}
                    />
                    <p className="text-red-600">
                      {errors.address ? errors.address : null}
                    </p>
                  </section>
                ) : null}
                <section>
                  <button
                    className="bg-light-2 font-nunito font-bold rounded-3xl px-2 py-1 mr-1 border-2 border-transparent dark:text-black hover:text-white hover:scale-95 dark:bg-light-1"
                    onClick={handleSubmit}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-gray-300 font-nunito font-bold dark:bg-gray-800 rounded-3xl px-2 py-1 dark:text-gray-300 ml-1 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1"
                    name="cancel"
                    onClick={handleClick}
                  >
                    Cancelar
                  </button>
                </section>
              </div>
            ) : (
              <button
                className="bg-light-2 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-zinc-900 hover:text-light-2 hover:scale-95 dark:bg-light-1"
                name="edit"
                onClick={handleClick}
              >
                Editar Perfil
              </button>
            )}
          </div>

          <div className="mx-4">
            <h1 className="font-nunito text-2xl font-bold max-lg:flex max-lg:justify-center items-center mt-9 mb-4 max-lg:mx-4 dark:font-light">
              Capacitaciones en curso y completadas
            </h1>

            {trainingsUser?.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {trainingsUser?.map((t, i) => {
                  return (
                    <div key={i} className="flex justify-center">
                      <div className="text-center mx-1 my-4 max-lg:bg-light-0 dark:max-lg:bg-light-0 dark:max-lg:text-black  border-2 border-light-2 bg-light-1 dark:border-light-1 dark:bg-light-2 hover:scale-95 p-4 rounded-3xl w-[400px]">
                        <h2 className="text-xl font-nunito font-bold border-b-2 border-light-2 dark:border-light-1 dark:font-light dark:max-lg:font-bold mb-2">
                          {t.name}
                        </h2>
                        <div>
                          <video
                            className="inline-block border-2 border-light-1 dark:border-light-1 rounded-3xl"
                            src={t.video[0]}
                            controls
                            width="300"
                            height="250"
                          />
                        </div>
                        <NavLink to={`/training/detail/${t.id}`}>
                          <button className="border-2 mt-2 bg-light-2 max-lg:bg-light-2 max-lg:border-light-1 dark:bg-light-1 dark:text-black border-light-2 dark:border-light-1 dark:max-lg:bg-light-1 rounded-3xl p-1 font-topmodern hover:text-white">
                            Ver detalle
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <h1>Aún no te has inscripto a ni una capacitación</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </div>
  );
}
