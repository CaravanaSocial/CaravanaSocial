import React from "react";
import { Link } from "react-router-dom";

const TrainingCard = ({ training }) => {
  return (
    <div className="bg-white w-48 p-4 rounded-3xl border-2 border-zinc-100 shadow-md m-2">
      <h2 className="text-lg font-semibold">{training.name}</h2>
      <p className="text-gray-600">{training.description}</p>
      <div className="flex justify-center">
        <video
          src={training.video[0]}
          controls
          width="200"
          height="230"
        ></video>
      </div>
      <Link to={`/trainings/${training.id}`}>Ver todos los videos</Link>
    </div>
  );
};

export default TrainingCard;
