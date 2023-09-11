import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser, trainingDetail } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";

const TrainingCard = ({ training }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("trainings", training);

  const handleSubmit = () => {
    dispatch(trainingDetail(training.id));
    navigate(`/training/detail/${training.id}`);
    dispatch(adduser({ userId: localStorage.accId, trainingId: training.id }));
  };

  return (
    <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[370px] sm:h-auto sm:w-[400px]  justify-center ">
      <h2 className="text-lg font-topmodern">{training.name}</h2>
      <p className="text-gray-600 font-topmodern">{training.description}</p>
      <div className="flex justify-center"></div>
      <button onClick={handleSubmit}>Unirse a capacitacion</button>
    </div>
  );
};

export default TrainingCard;
