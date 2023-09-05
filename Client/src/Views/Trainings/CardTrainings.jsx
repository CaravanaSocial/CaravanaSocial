import React from "react";
import { Link } from "react-router-dom";

const TrainingCard = ({ training }) => {
  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[400px]  justify-center">
      <h2 className="text-lg font-topmodern">{training.name}</h2>
      <p className="text-gray-600 font-topmodern">{training.description}</p>
      <div className="flex justify-center">
        <video
          src={training.video[0]}
          controls
          width="200"
          height="150"
        ></video>
      </div>
      <Link className="font-topmodern" to={`/trainings/${training.id}`}>
        Ver todos los videos
      </Link>
    </div>
  );
};

export default TrainingCard;
