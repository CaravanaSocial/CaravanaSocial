import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "../UpdateProfile/validation";
import UploadImage from "../../components/UploadImage";
import {
  getCountry,
  getState,
  getCity,
  getCategories,
  editUser,
} from "../../Redux/Actions/Actions";

export default function ProfileUser() {
  const account = JSON.parse(localStorage.account);
  const profilePicture = localStorage.profilePicture;
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [key, setKey] = useState(0);
  const categories = account.areaTrainings?.map((c) => c.name);
  const [dataAcc, setDataAcc] = useState({
    id: account.id,
    activate: account.activate,
    email: account.email,
    birthDate: account.birthDate,
    name: account.name,
    lastName: account.lastName,
    location: {
      country: account.location.country,
      city: account.location.city,
      state: account.location.state,
    },
    CUD: account.CUD,
    category: categories,
    certificates: account.certificates,
    freelancer: account.freelancer,
    description: account.description,
    address: account.address,
    profilePicture: profilePicture,
  });
  const [checkboxFreelancer, setCheckboxFreelancer] = useState(
    account.freelancer
  );

  console.log(dataAcc.profilePicture);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCategories());
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
        location: { ...dataAcc.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
        })
      );
      dispatch(getState(value));
    } else if (name === "state") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
        })
      );
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc.location, [name]: value },
      });
      setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
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
    const filteredCat = dataAcc.category.filter(
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

  return (
    <div className="h-full">
      <section className="flex ">
        <div className="flex flex-col text-center border-spacing-96 border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 m-4">
          <img key={key} className="h-[300px] w-[300px] rounded-full" src={profilePicture} />
          
          <br />
          <h1 className="font-vilaka text-[30px] font-bold">
            {account.name + " " + account.lastName}
          </h1>
          <br />
          {edit === false ? (
            <button
              className="font-topmodern border-2 border-light-1 rounded hover:text-light-1"
              name="edit"
              onClick={handleClick}
            >
              Editar Perfil
            </button>
          ) : (
            <div className="flex flex-col">
              <UploadImage />
              <button
                className="font-topmodern border-2 rounded border-light-1 bg-light-1 hover:text-white"
                onClick={handleSubmit}
              >
                Guardar imagen
              </button>
              <input
                className=" font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                name="name"
                onChange={handleChange}
                value={dataAcc.name}
                placeholder="Nombre..."
              />
              {
                <p className="text-red-600">
                  {errors.name ? errors.name : null}
                </p>
              }
              <br />
              <input
                className=" font-vilaka text-[22px] font-bold rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                name="lastName"
                onChange={handleChange}
                value={dataAcc.lastName}
                placeholder="Apellido..."
              />
              <p className="text-red-600">
                {errors.lastName ? errors.lastName : null}
              </p>
              <br />
              <select
                className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                name="country"
                onChange={handleChange}
              >
                <option>Pais</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="text-red-600">
                {errors.country ? errors.country : null}
              </p>
              <br />
              <select
                className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                name="state"
                onChange={handleChange}
              >
                <option>Estado/Provincia</option>
                {states.allStates?.map((c) => (
                  <option key={c.name} id={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-red-600">
                {errors.state ? errors.state : null}
              </p>
              <br />
              <select
                className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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
              <p className="text-red-600">{errors.city ? errors.city : null}</p>
              <br />
              <span className="font-topmodern">Ubicacion:</span>
              <div className="p-2 m-auto bg-zinc-300 text-zinc-800 focus:border-transparent w-[200px] justify-center align-middle rounded-3xl">
                <div className="text-center font-vilaka font-bold text-[25px] bg-zinc-400 mb-1 rounded-3xl">
                  {dataAcc.location.country}
                </div>
                <div className="text-center font-vilaka font-bold text-[25px] bg-zinc-400 mb-1 rounded-3xl">
                  {dataAcc.location.state}
                </div>
                <div className="text-center font-vilaka font-bold text-[25px] bg-zinc-400 mb-1 rounded-3xl">
                  {dataAcc.location.city}
                </div>
              </div>
              <br />
              <input name="CUD" onChange={handleChange} placeholder="CUD..." />
              <br />
              <select
                className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
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
                {dataAcc.category?.map((cat) => {
                  return (
                    <div
                      key={cat}
                      className="text-center bg-zinc-400 mb-1 rounded-3xl"
                    >
                      {cat}
                      <button
                        className="bg-red-600 px-1 text-white h-[20px] m-auto rounded-3xl"
                        onClick={handleDelCategory}
                        value={cat}
                      >
                        {" "}
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
              <p
                className="text-red-600"
                style={{ visibility: errors.category ? "visible" : "hidden" }}
              >
                {errors.category}
              </p>
              <br />
              <h2 className="font-topmodern">Sos Freelancer?</h2>
              <label className="font-bold">
                {" "}
                Si{" "}
                <input
                  type="checkbox"
                  checked={checkboxFreelancer === true}
                  onChange={() => handleCheckboxFreeChange(true)}
                />
              </label>
              <label className="font-bold">
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
                  <h2 className="font-topmodern">
                    Descripción de tu Emprendimiento
                  </h2>
                  <input
                    className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="description"
                    placeholder="añadir descripcion"
                    value={dataAcc.description}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">
                    {errors.description ? errors.description : null}
                  </p>

                  <h2 className="font-topmodern">Dirección de su negocio </h2>
                  <input
                    className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="address"
                    value={dataAcc.address}
                    onChange={handleChange}
                  />
                  <p className="text-red-600">
                    {errors.address ? errors.address : null}
                  </p>
                </section>
              ) : null}
              <br />
              <section>
                <button
                  className="bg-light-1 font-topmodern mt-2 hover:text-white text-black rounded-3xl p-1"
                  onClick={handleSubmit}
                >
                  Guardar
                </button>
                <button
                  className="bg-zinc-300 font-topmodern hover:text-light-1 ml-2 mt-2 text-black rounded-3xl p-1"
                  name="cancel"
                  onClick={handleClick}
                >
                  Cancelar
                </button>
              </section>
            </div>
          )}
        </div>
        <div>
          <h1 className="font-topmodern">
            Capacitaciones en curso y completadas
          </h1>
        </div>
      </section>
    </div>
  );
}
