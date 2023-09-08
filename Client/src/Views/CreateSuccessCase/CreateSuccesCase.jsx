import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import UploadVideo from "../../components/UploadVideo";

const CreateSuccesCase = () => {
  return (
    <main className="h-full text-center">
      <div className="inline-block m-4 p-4 text-center ">
        <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
          <h1 className="text-[60px] font-vilaka font-bold border-b-2 border-zinc-100 dark:border-zinc-800">
            Crear Caso de Exito
          </h1>
          <h2 className="font-topmodern">Nombre</h2>
          <input
            className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
            name="name"
            placeholder="Nombre..."
          />
          <h2 className="font-topmodern">Foto</h2>
          <CloudinaryContext cloudName="da785kmjd">
            <div className="App">
              <UploadVideo />
            </div>
          </CloudinaryContext>

          <h2 className="font-topmodern">Historia</h2>
          <textarea
            className="rounded-3xl px-2 py-1 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
            name="history"
            cols="50"
            rows="10"
            placeholder="Historia..."
          />
          <h2 className="font-topmodern">Link de la pagina web</h2>
          <input
            className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
          />
          <h2 className="font-topmodern">Link de Facebook</h2>
          <input
            className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
          />
          <h2 className="font-topmodern">Link de Instagram</h2>
          <input
            className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
            type="text"
          />
        </div>
      </div>
    </main>
  );
};

export default CreateSuccesCase;
