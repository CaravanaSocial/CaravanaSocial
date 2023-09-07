import React, { useDebugValue } from 'react'
import { CloudinaryContext, Image, Transformation, } from 'cloudinary-react';
import { useDispatch } from 'react-redux';
import { uploadVideo } from '../Redux/Actions/Actions';

const UploadVideo = () => {
    const dispatch = useDispatch()
    const cloudName = "da785kmjd"; // Reemplaza con tu cloud name
    const uploadPreset = "rdvhkotr";   // Reemplaza con tu upload preset
  
    const handleUploadSuccess = (result) => {
      console.log('Done! Here is the image info: ', result.info);
      dispatch(uploadVideo(result.info))
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
              if (!error && result && result.event === 'success') {
                handleUploadSuccess(result);
                
              }
            }
          );
        }}
      >
        Cargar videos desde archivos
      </button>
    </div>
  )
}

export default UploadVideo