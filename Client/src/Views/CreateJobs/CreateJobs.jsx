import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOffer, getCategories } from "../../Redux/Actions/Actions";
import Validation from "./Validation";

export default function createJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentAccount = useSelector((state) => state.currentAccount);
  const category = useSelector((state) => state.categories);
  const [error, setError] = useState({});
  const [inputJobs, setInputJobs] = useState({
    title: "",
    description: "",
    category: [],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleChange = (event) => {
    setInputJobs({
      ...inputJobs,
      [event.target.name]: event.target.value,
    });
    setError(
      Validation({
        ...inputJobs,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createOffer(inputJobs));
      navigate("/home-offers");
    }
  };

  const handleCategory = (event) => {
    const rep = inputJobs.category.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setInputJobs({
        ...inputJobs,
        category: [...inputJobs.category, event.target.value],
      });
      event.target.value = "default";
      validateInput({
        ...inputJobs,
        category: [...inputJobs.category, event.target.value],
      });
    }
    event.target.value = "default";
  };

  const validateInput = (companyInputData) => {
    const error = Validation(companyInputData);
    setError(error);
  };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = inputJobs.category.filter(
      (cat) => cat !== event.target.value
    );
    setInputJobs({
      ...inputJobs,
      category: filteredCat,
    });
    validateInput({ ...inputJobs, category: filteredCat });
  };

  const disabled =
    !inputJobs.title || !inputJobs.category || inputJobs.description;

  return (
    <div className=" h-full text-center ">
      <div className="inline-block m-4 p-4 text-center ">
        <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
          <h1 className="text-4xl  border-b-2 border-zinc-100 dark:border-zinc-800">
            Crea un Aviso de Trabajo
          </h1>

          <h2>Nombre del Aviso de Trabajo</h2>
          <input
            className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
            name="title"
            value={inputJobs.title}
            onChange={handleChange}
            placeholder="Nombre..."
          />
          <br />
          {error.title && <span className="text-red-600">{error.title}</span>}

          <h2>Categoria</h2>
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
            {inputJobs.category.map((cat) => {
              return (
                <div className="text-center bg-zinc-400 mb-1 rounded-3xl">
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
            style={{ visibility: error.category ? "visible" : "hidden" }}
          >
            {error.category}
          </p>

          <h2>Descripción</h2>
          <textarea
            className="rounded-3xl px-2 py-1 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
            name="description"
            cols="20"
            rows="8"
            value={inputJobs.description}
            onChange={handleChange}
            placeholder="Descripcion..."
          />
          <br />
          {error.description && (
            <span className="text-red-600">{error.description}</span>
          )}

          <button
            className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
