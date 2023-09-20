import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import UploadImage from "../../components/UploadImage.jsx";
import NotFound from "../../components/NotFound.jsx";
import { useDispatch } from "react-redux";
import { createSuccessCase } from "../../Redux/Actions/Actions.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateSuccesCase = () => {
  const dispatch = useDispatch();

  const [bandera, setBandera] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "",
    history: "",
    webpage: null,
    fb: null,
    ig: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    form.image = localStorage.caseImage;
  }, [bandera]);

  console.log(form);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setBandera(!bandera);
    if (
      event.target.name === "webpage" ||
      event.target.name === "fb" ||
      event.target.name === "ig"
    ) {
      if (event.target.value === "") {
        setForm({ ...form, [event.target.name]: null });
      }
    }
  };

  const handleSubmit = () => {
    dispatch(createSuccessCase(form));
    navigate("/");
  };

  return (
    <main className="h-full text-center">
      {localStorage.lenght !== 0 && localStorage.type === "superAdmin" ? (
        <div className="inline-block m-4 p-4 text-center ">
          <div className="justify-center text-center border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 m-4">
            <h1 className="text-[60px] font-vilaka font-bold border-b-2 border-zinc-100 dark:border-zinc-800">
              Crear Caso de Exito
            </h1>
            <h2 className="font-topmodern">Nombre</h2>
            <input
              onChange={handleChange}
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="text"
              name="name"
              placeholder="Nombre..."
            />
            <h2 className="font-topmodern">Foto</h2>
            <CloudinaryContext cloudName="da785kmjd">
              <div className="App">
                <UploadImage />
              </div>
            </CloudinaryContext>

            <h2 className="font-topmodern">Historia</h2>
            <textarea
              onChange={handleChange}
              className="rounded-3xl px-2 py-1 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="text"
              name="history"
              cols="50"
              rows="10"
              placeholder="Historia..."
            />
            <h2 className="font-topmodern">Link de la pagina web</h2>
            <input
              onChange={handleChange}
              name="webpage"
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="text"
            />
            <h2 className="font-topmodern">Link de Facebook</h2>
            <input
              onChange={handleChange}
              name="fb"
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="text"
            />
            <h2 className="font-topmodern">Link de Instagram</h2>
            <input
              onChange={handleChange}
              name="ig"
              className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="text"
            />
            <br />
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="border-2 p-1 px-4 font-nunito font-bold bg-light-1 hover:scale-105 rounded"
            >
              Agregar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </main>
  );
};

export default CreateSuccesCase;
