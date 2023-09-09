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
    !inputJobs.title || !inputJobs.category || !inputJobs.description;

  return (
    <div className=" h-full text-center ">
      <div className="inline-block m-4 p-4 text-center ">
        <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
          <h1 className="text-3xl mb-1 dark:text-gray-300">Crea un Aviso de Trabajo</h1>

          <div className="border-t-2 border-lime-600 dark:border-lime-700"/>

          <h2 className="text-lg dark:text-gray-300">Nombre del Aviso de Trabajo</h2>
          <input
            className="h-8 rounded-3xl px-2 my-2 bg-gray-200 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="text"
            name="title"
            value={inputJobs.title}
            onChange={handleChange}
            placeholder="Nombre..."
          />
          <br />
          {error.title && <span className="text-red-600">{error.title}</span>}
          <br />

          <select
            className="h-8 rounded-3xl px-2 my-2 bg-gray-200 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
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
          {inputJobs.category.length ? (
              <h2 className="text-lg dark:text-gray-300">Rubros seleccionados: </h2>
            ) : null}
              {inputJobs.category.map((cat, i) => {
                return (
                  <div key={i}>
                    <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl px-2 py-1 m-1 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500"
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

          <h2 className="text-lg dark:text-gray-300">Descripción</h2>
          <textarea
            className="rounded-3xl px-2 py-1 my-2 bg-gray-200 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
            type="text"
            name="description"
            cols="28"
            rows="8"
            value={inputJobs.description}
            onChange={handleChange}
            placeholder="Descripcion..."
          />
          <br />
          {error.description && (
            <span className="text-red-600">{error.description}</span>
          )}
          <br />

          <button
            className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 my-2 dark:text-gray-300"
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
