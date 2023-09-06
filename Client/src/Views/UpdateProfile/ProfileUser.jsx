import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountry,
  getState,
  getCity,
  getCategories,
  editUser,
} from "../../Redux/Actions/Actions";

export default function ProfileUser() {
  const account = JSON.parse(localStorage.account);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const states = useSelector((state) => state.states);
  const cities = useSelector((state) => state.cities);
  const category = useSelector((state) => state.categories);
  const [edit, setEdit] = useState(false);
  const categories = account.areaTrainings?.map((c) => c.name);
  const [dataAcc, setDataAcc] = useState({
    id: account.id,
    activate: account.activate,
    email: account.email,
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
    profilePicture: account.profilePicture,
  });
  const [checkboxFreelancer, setCheckboxFreelancer] = useState(
    account.freelancer
  );

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCategories());
  }, []);

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
      /* delete errors.description;
      delete errors.address; */
    }
    if (checkbox === true) {
      setDataAcc({
        ...dataAcc,
        freelancer: true,
      });
      /* errors.description = "Debe ingresar una descripción de su trabajo";
      errors.address = "Debe ingresar su geolocalización"; */
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "country") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc.location, [name]: value },
      });
      /* setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
        })
      ); */
      dispatch(getState(value));
    } else if (name === "state") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc.location, [name]: value },
      });
      /* setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
        })
      ); */
      dispatch(getCity(event.target.options[event.target.selectedIndex].id));
    } else if (name === "city") {
      setDataAcc({
        ...dataAcc,
        location: { ...dataAcc.location, [name]: value },
      });
      /* setErrors(
        validation({
          ...dataAcc,
          location: { ...dataAcc.location, [name]: value },
        })
      ); */
    } else {
      setDataAcc({
        ...dataAcc,
        [name]: value,
      });
      /* setErrors(
        validation({
          ...dataAcc,
          [name]: value,
        })
      ); */
    }
  };

  const handleCategory = (event) => {
    const rep = dataAcc.category.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setDataAcc({
        ...dataAcc,
        category: [...dataAcc.category, event.target.value],
      });
      event.target.value = "default";
      /* validateInput({
        ...dataAcc,
        category: [...dataAcc.category, event.target.value],
      }); */
    }
    event.target.value = "default";
  };

  /* const validateInput = (companyInputData) => {
    const errors = validation(companyInputData);
    setErrors(errors);
  }; */

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = dataAcc.category.filter(
      (cat) => cat !== event.target.value
    );
    setDataAcc({
      ...dataAcc,
      category: filteredCat,
    });
    /* validateInput({ ...dataAcc, category: filteredCat }); */
  };

  const handleSubmit = () => {
    dispatch(editUser(account.id, dataAcc));
    const editedAccount = JSON.stringify(dataAcc);
    localStorage.setItem("account", editedAccount);
    setEdit(false);
  };

  return (
    <div>
      <section className="flex">
        <div className="flex flex-col">
          <img className="h-[300px] w-[300px]" src={account.profilePicture} />
          <br />
          <h1>{account.name + " " + account.lastName}</h1>
          <br />
          {edit === false ? (
            <button name="edit" onClick={handleClick}>
              Editar Perfil
            </button>
          ) : (
            <div className="flex flex-col">
              <input
                name="name"
                onChange={handleChange}
                value={dataAcc.name}
                placeholder="Nombre..."
              />
              <br />
              <input
                name="lastName"
                onChange={handleChange}
                value={dataAcc.lastName}
                placeholder="Apellido..."
              />
              <br />
              <select name="country" onChange={handleChange}>
                <option>Pais</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <br />
              <select name="state" onChange={handleChange}>
                <option>Estado/Provincia</option>
                {states.allStates?.map((c) => (
                  <option key={c.name} id={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <br />
              <select name="city" onChange={handleChange}>
                <option>Ciudad</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <br />
              <span>Ubicacion:</span>
              <div className="p-2 m-auto bg-zinc-300 text-zinc-800 focus:border-transparent w-[200px] justify-center align-middle rounded-3xl">
                <div className="text-center bg-zinc-400 mb-1 rounded-3xl">
                  {dataAcc.location.country}
                </div>
                <div className="text-center bg-zinc-400 mb-1 rounded-3xl">
                  {dataAcc.location.state}
                </div>
                <div className="text-center bg-zinc-400 mb-1 rounded-3xl">
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
              <span>Rubros seleccionados: </span>
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
              <h2>Sos Freelancer?</h2>
              <label>
                {" "}
                Si{" "}
                <input
                  type="checkbox"
                  checked={checkboxFreelancer === true}
                  onChange={() => handleCheckboxFreeChange(true)}
                />
              </label>
              <label>
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
                  <h2>Descripción de tu Emprendimiento</h2>
                  <input
                    className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="description"
                    placeholder="añadir descripcion"
                    value={dataAcc.description}
                    onChange={handleChange}
                  />

                  <h2>Dirección de su negocio </h2>
                  <input
                    className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="address"
                    value={dataAcc.address}
                    onChange={handleChange}
                  />
                </section>
              ) : null}
              <br />
              <section>
                <button onClick={handleSubmit}>Guardar</button>
                <button name="cancel" onClick={handleClick}>
                  Cancelar
                </button>
              </section>
            </div>
          )}
        </div>
        <div>
          <h1>Capacitaciones en curso y completadas</h1>
        </div>
      </section>
    </div>
  );
}
