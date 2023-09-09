import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { trainingDetail } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";


const TrainingCard = ({ training }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () =>{
    dispatch(trainingDetail(training.id))
    navigate(`/training/detail/${training.id}`)
  }

  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[370px] sm:h-full sm:w-[400px] justify-center">
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
      <button onClick={handleSubmit}>
      Ver todos los videos
      </button>
    </div>
  );
};

export default TrainingCard;
