import React, { useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, uploadVideo } from "../Redux/Actions/Actions";

const UploadVideo = () => {
  const dispatch = useDispatch();
  const cloudName = "da785kmjd"; // Reemplaza con tu cloud name
  const uploadPreset = "an5itlfl"; // Reemplaza con tu upload preset

  const handleUploadSuccess = (result) => {
    console.log("Done! Here is the image info: ", result.info.secure_url);
  };

  return (
    <div>
      <button
        className="bg-gray-300 dark:bg-gray-800 rounded-3xl p-2 dark:text-gray-300 border-2 border-transparent hover:border-lime-600 dark:hover:border-lime-700"
        id="upload_widget"
        onClick={() => {
          cloudinary.openUploadWidget(
            {
              cloudName: cloudName,
              uploadPreset: uploadPreset,
            },
            (error, result) => {
              if (!error && result && result.event === "success") {
                handleUploadSuccess(result);
                dispatch(addVideo(result.info.secure_url));
              }
            }
          );
        }}
      >
        Cargar videos desde archivos
      </button>
    </div>
  );
};

export default UploadVideo;
