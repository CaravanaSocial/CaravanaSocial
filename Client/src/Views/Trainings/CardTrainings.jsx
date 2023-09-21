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
    <div className="flex-col  bg-light-1 hover:bg-light-2 dark:hover:bg-light-1 dark:bg-light-2 p-4 rounded-3xl shadow-md  w-[230px] h-[400px] flex justify-center sm:h-full items-center sm:w-[300px]  md:w-[300px] md:h-full ">
      <h2 className="text-[25px] font-nunito font-bold  text-black whitespace-normal ">
        {training.name}
      </h2>
      <p className="font-nunito h-[40px] w-[250px] truncate text-center font-bold text-[16px] mb-4 dark:text-black">
        {training.description}
      </p>
      <div className="text-center justify-center flex">
        <img className="h-[380px] w-[450px] object-cover object-center rounded-full  md:h-[280px] md:w-[300px] sm:h-[280px] sm:w-[400px] " src={training?.company?.profilePicture} alt="" />
      </div>
      <div>

      <button
       className=" mt-3 rounded-3xl font-nunito font-bold  bg-zinc-300 px-3 dark:font-light dark:text-white p-1 hover:scale-105 dark:bg-zinc-800 "
        onClick={handleSubmit}
      >
        Ver más
      </button>
      </div>
    </div>
  );
};

export default TrainingCard;
