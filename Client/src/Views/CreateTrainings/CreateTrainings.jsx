import { useEffect } from "react";
import { useState, useRef } from "react";
import Validation from "./Validation";
import {
  createTraining,
  getCategories,
  getTrainings,
} from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "../../components/NotFound";

export default function createTrainings() {
  const speech = useSelector((state) => state.enableSpeech);
  const [synth, setSynth] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const addBtn = useRef(null);
  const [video, setVideo] = useState({ video: "" });
  const [error, setError] = useState({});
  const [inputTrainings, setInputTrainings] = useState({
    name: "",
    category: [],
    description: "",
    /*  video: [], */
  });

  useEffect(() => {
    dispatch(getCategories());
    setSynth(window.speechSynthesis);
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

  // const handleCategory = (event) => {
  //   const rep = inputTrainings.category.find(
  //     (cat) => cat === event.target.value
  //   );
  //   if (event.target.value !== "default" && !rep) {
  //     setInputTrainings({
  //       ...inputTrainings,
  //       category: [...inputTrainings.category, event.target.value],
  //     });
  //     event.target.value = "default";
  //   }
  // };

  const validateInput = (inputData) => {
    const errors = Validation(inputData);
    setError(errors);
  };

  const handleCategory = (event) => {
    const rep = inputTrainings.category.find((cat) => cat === event.target.value);
    if (event.target.value !== "default" && !rep) {
      setInputTrainings({
        ...inputTrainings,
        category: [...inputTrainings.category, event.target.value],
      });
      event.target.value = "default";
      validateInput({
        ...inputTrainings,
        category: [...inputTrainings.category, event.target.value],
      });
    }
    event.target.value = "default";
  };

  // const handleDelCategory = (event) => {
  //   event.preventDefault();
  //   const filteredCat = inputTrainings.category.filter(
  //     (cat) => cat !== event.target.value
  //   );
  //   setInputTrainings({
  //     ...inputTrainings,
  //     category: filteredCat,
  //   });
  // };

  const handleDelCategory = (event) => {
    event.preventDefault();
    const filteredCat = inputTrainings.category.filter(
      (cat) => cat !== event.target.value
    );
    setInputTrainings({
      ...inputTrainings,
      category: filteredCat,
    });
    validateInput({ ...inputTrainings, category: filteredCat });
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

  // const disabled =
  //   !inputTrainings.name ||
  //   !inputTrainings.category ||
  //   !inputTrainings.description;

    const isSubmitDisabled =
    Object.keys(error).length > 0 || inputTrainings.category.length === 0;


  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(error).length === 0) {
      dispatch(createTraining(inputTrainings)).then((data) => {
        navigate("/trainings/video/" + data.id);
      });
      dispatch(getTrainings());
    }
  };

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
    <div className="h-full text-center">
      {localStorage.length !== 0 && localStorage.type !== "user" ? (
        <div className="inline-block m-4 p-4 text-center ">
          <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
            <h1 className="text-3xl mb-1 dark:text-gray-300"
            onClick={() => speakText("Crea una Capacitación")}
            onMouseLeave={() => {cancelVoice;}}
            >
              Crea una Capacitación
            </h1>

            <div className="border-t-2 border-lime-600 dark:border-lime-700" />

            <h2 className="text-lg dark:text-gray-300"
            onClick={() => speakText("Nombre de la Capacitación")}
            onMouseLeave={() => {cancelVoice;}}>
              Nombre de la Capacitación
            </h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              type="text"
              name="name"
              value={inputTrainings.name}
              onChange={handleChange}
              placeholder="Nombre..."
            />
            <br />
            {error.name && <span className="text-red-600">{error.name}</span>}

            <br />

            <select
              className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              onChange={handleCategory}
              name="category"
            >
              <option value="default"
              onClick={() => speakText("rubro")}
              onMouseLeave={() => {cancelVoice;}}
              >rubro</option>
              {categories?.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
            <br />
            {inputTrainings.category.length ? (
              <h2 className="text-lg dark:text-gray-300"
              onClick={() => speakText("Rubros seleccionados")}
              onMouseLeave={() => {cancelVoice;}}
              >
                Rubros seleccionados:{" "}
              </h2>
            ) : null}
            {inputTrainings.category.map((cat, i) => {
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
            <span className="text-red-600" style={{ visibility: error.category ? "visible" : "hidden" }}>{error.category} </span>

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
              value={inputTrainings.description}
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
              // disabled={disabled}
              style={
                isSubmitDisabled
                  ? { opacity: "0.6", cursor: "not-allowed" }
                  : null
              }
              disabled={isSubmitDisabled}
            >
              Continuar
            </button>
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
