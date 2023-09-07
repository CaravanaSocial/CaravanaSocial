import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Validation from "./Validation";
import {
  createTraining,
  getCategories,
  getTrainings,
} from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import UploadImage from "../../components/UploadImage";

export default function createTrainings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.categories);
  const addBtn = useRef(null);
  const [video, setVideo] = useState({ video: "" });
  const [error, setError] = useState({});
  const [inputTrainings, setInputTrainings] = useState({
    name: "",
    category: [],
    description: "",
    video: [],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addBtn.current.click();
    }
  };

  const handleChange = (event) => {
    setInputTrainings({
      ...inputTrainings,
      [event.target.name]: event.target.value,
    });
    setError(
      Validation({
        ...inputTrainings,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleCategory = (event) => {
    const rep = inputTrainings.category.find(
      (cat) => cat === event.target.value
    );
    if (event.target.value !== "default" && !rep) {
      setInputTrainings({
        ...inputTrainings,
        category: [...inputTrainings.category, event.target.value],
      });
      event.target.value = "default";
    }
  };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = inputTrainings.category.filter(
      (cat) => cat !== event.target.value
    );
    setInputTrainings({
      ...inputTrainings,
      category: filteredCat,
    });
  };

  const handleChangeVideo = (event) => {
    setVideo({
      ...video,
      [event.target.name]: event.target.value,
    });
    setError(
      Validation({
        ...inputTrainings,
        ...video,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmitVideo = () => {
    if (video.video) {
      setInputTrainings({
        ...inputTrainings,
        video: [...inputTrainings.video, video.video],
      });
    }
    setVideo({ video: "" });
  };

  const deleteChoice = (video, value) => {
    const newValues = inputTrainings[video].filter((event) => event !== value);
    setInputTrainings({
      ...inputTrainings,
      video: newValues,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createTraining(inputTrainings));
      dispatch(getTrainings());
      navigate("/home-trainings");
    }
  };

  return (
    <div className="inline-block m-4 p-4 h-screen">
      <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 my-4">
        <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800">
          Crea una Capacitación
        </h1>

        <h2>Nombre de la Capacitación</h2>
        <input
          className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          type="text"
          name="name"
          value={inputTrainings.name}
          onChange={handleChange}
          placeholder="Nombre..."
        />
        <br />
        {error.name && <span className="text-red-600">{error.name}</span>}

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
          {inputTrainings.category.map((cat) => {
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

        <h2>Descripción</h2>
        <textarea
          className="rounded-3xl px-2 py-1 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          type="text"
          name="description"
          cols="20"
          rows="8"
          value={inputTrainings.description}
          onChange={handleChange}
          placeholder="Descripcion..."
        />
        <br />
        {error.description && (
          <span className="text-red-600">{error.description}</span>
        )}

        <h2>Video</h2>
        <input
          className="align-text-top rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
          type="url"
          name="video"
          value={video.video}
          onChange={handleChangeVideo}
          placeholder="Url..."
          onKeyDown={handleKeyPress}
        />

        <button
          className="bg-zinc-300 mx-2 px-2 pb-1 text-black rounded-3xl"
          type="submit"
          onClick={handleSubmitVideo}
          ref={addBtn}
        >
          +
        </button>
        <br />
        {error.video && <span className="text-red-600">{error.video}</span>}

        <div>
          {inputTrainings.video.map((v, i) => {
            if (i < 7) {
              return (
                <div key={i}>
                  <button
                    className="bg-zinc-300 text-black rounded-3xl m-1 p-2"
                    type="button"
                    onClick={() => deleteChoice("videos", v)}
                  >
                    {v}
                  </button>
                </div>
              );
            }
          })}
        </div>

        {/* <UploadImage/> */}

        <button
          className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
          type="submit"
          onClick={handleSubmit}
        >
          Crear
        </button>
      </div>
    </div>
  );
}
