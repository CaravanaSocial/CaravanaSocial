import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser, trainingDetail } from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";

const TrainingCard = ({ training }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(trainingDetail(training.id));
    navigate(`/training/detail/${training.id}`);
  };

  return (
    <div className="border-2 flex-col border-light-1 dark:bg-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <h2 className="text-[25px] font-topmodern whitespace-normal ">
        {training.name}
      </h2>
      <p className="font-nunito whitespace-normal text-center font-bold text-[16px]">
        {training.description}
      </p>
      <img
        src={training?.company?.profilePicture} alt=""
      />

      <button
        className="border-2 rounded-lg font-topmodern  bg-light-1  dark:text-black p-1 hover:scale-105 dark:border-black w-[100px] m-auto"
        onClick={handleSubmit}
      >
        Ver mas
      </button>
    </div>
  );
};

export default TrainingCard;
