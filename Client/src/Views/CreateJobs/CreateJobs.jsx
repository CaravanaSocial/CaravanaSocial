import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOffer, getCategories } from "../../Redux/Actions/Actions";
import Validation from "./Validation";
import NotFound from "../../components/NotFound";

export default function createJobs() {
  const speech = useSelector((state) => state.enableSpeech);
  const [synth, setSynth] = useState(null);
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
  const userInfo = JSON.parse(localStorage.account);
  const { nameCompany } = userInfo;
  const { profilePicture } = localStorage;
  useEffect(() => {
    dispatch(getCategories());
    setSynth(window.speechSynthesis);
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
    const speakText = (text) => {
      if (speech === true && synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1;
        utterance.lang = "es-ES";
        synth.speak(utterance);
      }
    };
    const cancelVoice = () => {
      if (synth) {
        synth.cancel();
      }
    };
  return (
    <div className="h-full p-4 flex justify-center text-center">
      {localStorage.length !== 0 && localStorage.type !== "user" ? (
        <div className="flex max-lg:flex-col text-center justify-center">
          <div className="flex justify-center text-center">
            <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
              <h1 className="text-3xl mb-1 dark:text-gray-300"
              onClick={() => speakText("Crea un Aviso de Trabajo")}
              onMouseLeave={() => {cancelVoice;}}
              >
                Crea un Aviso de Trabajo
              </h1>

              <div className="border-t-2 border-lime-600 dark:border-lime-700" />

              <br />
              <h2 className="text-lg dark:text-gray-300"
              onClick={() => speakText("Nombre del Aviso de Trabajo")}
              onMouseLeave={() => {cancelVoice;}}
              >
                Nombre del Aviso de Trabajo
              </h2>
              <input
                className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                type="text"
                name="title"
                value={inputJobs.title}
                onChange={handleChange}
                placeholder="Nombre..."
              />
              <br />
              {error.title && (
                <span className="text-red-600">{error.title}</span>
              )}

              <h2 className="text-lg dark:text-gray-300"
              onClick={() => speakText("Categoria")}
              onMouseLeave={() => {cancelVoice;}}
              >Categoria</h2>
              <select
                className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
                onChange={handleCategory}
                name="category"
              >
                <option value="default"
                onClick={() => speakText("rubro")}
                onMouseLeave={() => {cancelVoice;}}
                >rubro</option>
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
                <h2 className="text-lg dark:text-gray-300"
                onClick={() => speakText("Rubros seleccionados")}
                onMouseLeave={() => {cancelVoice;}}
                >
                  Rubros seleccionados:{" "}
                </h2>
              ) : null}
              {inputJobs.category.map((cat, i) => {
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

              <h2 className="text-lg dark:text-gray-300"
              onClick={() => speakText("Descripción")}
              onMouseLeave={() => {cancelVoice;}}
              >Descripción</h2>
              <textarea
                className="rounded-3xl px-2 py-1 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
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

              <button
                className="bg-light-1 font-topmodern rounded-3xl p-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
                type="submit"
                onClick={handleSubmit}
                disabled={disabled}
              >
                Crear
              </button>
            </div>
          </div>
          <div className="flex justify-center text-center">
            <div className="">
              <h1 className="mb-4">PREVIEW</h1>
              <div
                className="bg-white rounded-lg p-4 shadow-md text-center"
                style={{ width: "300px" }}
              >
                <h1 className="w-full rounded-t-lg text-3xl font-bold">
                  {nameCompany}
                </h1>
                <img
                  src={profilePicture}
                  alt="profile picture company"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h2 className="text-2xl font-semibold mt-2">
                  {inputJobs.title}
                </h2>
                <p className="text-gray-600">{inputJobs.description}</p>
              </div>
            </div>
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
