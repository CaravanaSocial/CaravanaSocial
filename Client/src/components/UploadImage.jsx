import React from "react";
import { useState } from "react";
import assets from "../assets/images/loading.gif";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editCompany, editUser, imageChange } from "../Redux/Actions/Actions";

export default function UploadImage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const resetFileInput = () => {
    const fileInput = document.getElementById("dropzone-file");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post("https://caravanaserver-qkv5.onrender.com", {
        image: base64,
      })
      .then((res) => {
        setUrl(res.data);
        if (localStorage.type === "user") {
          dispatch(editUser(localStorage.accId, { profilePicture: res.data }));
          localStorage.setItem("profilePicture", res.data);
          dispatch(imageChange());
        } else if (localStorage.type === "company") {
          dispatch(
            editCompany(localStorage.accId, { profilePicture: res.data })
          );
          localStorage.setItem("profilePicture", res.data);
          dispatch(imageChange());
        } else if (localStorage.type === "superAdmin") {
          console.log(res.data);
          localStorage.setItem("caseImage", res.data);
        }
        setUploadSuccess(true);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);

        if (error.response && error.response.status === 413) {
          alert("La imagen es demasiado grande. Debe ser más pequeña.");
        } else {
          alert("Hubo un error al cargar la imagen.");
        }

        setUploadSuccess(false);
      });
  }

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  function UploadInput() {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-light-1 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-lime-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          </div>

          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
          />
        </label>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col m-8 ">
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <img src={assets} alt="Loading" />
          </div>
        ) : (
          <div>
            {uploadSuccess ? (
              <p>La imagen se ha cargado correctamente.</p>
            ) : (
              <UploadInput />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
