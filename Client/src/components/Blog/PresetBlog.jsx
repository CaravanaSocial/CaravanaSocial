import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FacebookEmbed, InstagramEmbed, TwitterEmbed } from "react-social-media-embed";
import Swal from "sweetalert2";

import * as actions from "../../Redux/Actions/Actions";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const modules = {
  imageActions: {},
  imageFormats: {},
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      {
        color: [],
      },
      { background: [] },
    ],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "align",
  "width",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "header",
  "script",
  "code-block",
  "strike",
  "size",
  "color",
  "background",
  "font",
  "image",
  "align",
  "calltoaction",
  "link",
  "height",
  "float",
  "imagewithstyle",
];
const fecha = new Date();
const day = fecha.getDate();
const month = fecha.getMonth();
const year = fecha.getFullYear();
const nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function PresetBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [template, setTemplate] = React.useState("");
  const redesRef = React.useRef(null)

  const [selection, setSelection] = React.useState("editor");

  const [activeButton, setActiveButton] = React.useState({
    editor: false,
    previewEdit: false,
  });

  const [previewImage, setPreviewImage] = React.useState("image");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [previewCard, setPreviewCard] = React.useState({
    image: "image",
    title: "Titulo",
    author: "Autor",
    date: `${day} ${nombresMeses[month]} ${year}`,
  });

  const [urlData, setUrlData] = React.useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const { image, title, author, date } = previewCard;

  const hanldeActiveButton = (event) => {
    event.preventDefault();
    const { name } = event.target;
    setActiveButton({ ...activeButton, [name]: !activeButton[name] });
  };

  const handleSetMenu = (e) => {
    setSelection(e.target.value);
  };

  function imageToBase64(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64 = event.target.result;
      setPreviewCard({ ...previewCard, image: base64 });
    };

    reader.readAsDataURL(file);
  }

  const handleChangePreview = (event) => {
    const { name, value, files } = event.target;
    if (name == "previewImage") {
      imageToBase64(files[0]);
      setPreviewImage(files[0]);
    } else {
      setPreviewCard({ ...previewCard, [name]: value });
    }
  };

  const handleSubmit = () => {
    dispatch(actions.postBlog({ template, image, title, author, date, selection, urlData}));
    Swal.fire("Buen trabajo!", "Has creado con exito el Post!", "success");
    navigate("/blogs");
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubmitUrl = (e) => {
    e.preventDefault()
    const {name, value} = redesRef.current
    setUrlData({ ...urlData, [name]: value });
  }

  const handleClear = (e) => {
    e.preventDefault();
    redesRef.current.value = '';
    const { name } = redesRef.current;
    setUrlData({ ...urlData, [name]: '' });
  };

  return (
    <div className="flex max-lg:flex-col mx-5 my-5">
      <div className="bg-white-200 h-full flex justify-center items-center mb-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-10">Crear tarjeta de post</h1>
          <div className="justify-center items-center border rounded-lg border-gray-400 shadow-md p-4 w-[400px]">
            {!activeButton?.previewEdit ? (
              <img
                src={
                  previewImage !== "image"
                    ? URL.createObjectURL(previewImage)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHyZc-mwHF19kk-e89eFaKsc19552ElAuzOpV8Dwxhw&s"
                }
                alt="Blog image"
                className="w-full h-48 object-cover rounded-t-lg"
              />
            ) : null}
            {activeButton?.previewEdit ? (
              <input
                type="file"
                name="previewImage"
                onChange={handleChangePreview}
              />
            ) : null}

            {/* Title */}
            <div className="w-full rounded-t-lg mb-1 text-3xl font-bold text-left">
              {!activeButton?.previewEdit ? <h1>{previewCard.title}</h1> : null}
              {activeButton?.previewEdit ? (
                <input
                  type="text"
                  onChange={handleChangePreview}
                  value={previewCard.title}
                  name="title"
                />
              ) : null}
            </div>

            {/* Author */}
            <div className="text-xl font-semibold mt-2 text-left mb-2">
              {!activeButton?.previewEdit ? (
                <h2>{previewCard.author}</h2>
              ) : null}
              {activeButton?.previewEdit ? (
                <input
                  type="text"
                  onChange={handleChangePreview}
                  value={previewCard.author}
                  name="author"
                />
              ) : null}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center px-2">
              {!activeButton.previewEdit ? (
                <button
                  className="text-blue-600"
                  onClick={hanldeActiveButton}
                  name="previewEdit"
                >
                  Editar
                </button>
              ) : (
                <button
                  className="text-2xl"
                  onClick={hanldeActiveButton}
                  name="previewEdit"
                >
                  ✅
                </button>
              )}
              <p className="text-gray-600">{previewCard.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl">Crear Post</h1>
        <div className="flex gap-2 mt-3 mb-6 w-full h-[50px]">
          <div className="flex w-1/2 justify-end h-[50px] gap-1 relative">
            <button
              className="h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              name="editor"
              onClick={handleSetMenu}
              value="editor"
            >
              Post
            </button>
            <button
              className="h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              name="editorRedSocial"
              role="menu"
              onClick={handleMenu}
            >
              Red social
            </button>
            <div className="absolute z-10">
              {menuOpen ? (
                <div
                  onMouseLeave={handleMenu}
                  className=" absolute top-[50px] right-0 bg-white border border-gray-300 w-40 rounded shadow-lg"
                >
                  <div className="flex flex-col">
                    <button value="instagram" onClick={handleSetMenu}>Instagram</button>
                    <button value="facebook" onClick={handleSetMenu}>Facebook</button>
                    <button value="twitter" onClick={handleSetMenu}>Twitter</button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex h-[50px] w-1/2 justify-start">
            <button
              className="h-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Publicar Blog
            </button>
          </div>
        </div>
        <div>
          {selection!=="editor"?<div className="flex flex-col gap-1 my-5">
                <div className="flex justify-center mb-5">
                <h1 className="text-2xl">{selection}</h1>
                </div>
                <div>
                <form className="flex gap-2" onSubmit={handleSubmitUrl}>
                <input
                  placeholder={`URL de ${selection}`}
                  ref={redesRef}
                  name={selection}
                  className="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                />
                <button className="h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClear}>Limpiar</button>
                <button className="h-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Preview</button>
                </form>
                </div>
          </div>:null}
        
          {selection === "editor" ? (
            <ReactQuill
              className="mx-10 mb-5"
              theme="snow"
              value={template}
              onChange={setTemplate}
              modules={modules}
              formats={formats}
            />
          ) : selection === "facebook" ? (
            <div className="flex justify-center">
              
              {urlData.facebook ? (
                <FacebookEmbed url={urlData.facebook} />
              ) : (
                <h1>No hay URL seleccionada</h1>
              )}
            </div>
          ) : selection === "instagram" ?(
          <div className="flex justify-center">
            {urlData.instagram ? (
                <InstagramEmbed url={urlData.instagram} />
              ) : (
                <h1>No hay URL seleccionada</h1>
              )}
          </div>)
          :selection === "twitter" ?(
            <div>
              {urlData.twitter ? (
                <TwitterEmbed url={urlData.twitter} />
              ) : (
                <h1>No hay URL seleccionada</h1>
              )}
            </div>
          ):null}
        </div>
      </div>
    </div>
  );
}
