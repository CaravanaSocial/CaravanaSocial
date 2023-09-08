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
        className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
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
