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
    <div className="border-2 flex-col border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md  w-[230px] h-[400px] sm:h-full sm:w-[400px] flex justify-center">
      <h2 className="text-[30px] font-topmodern ">{training.name}</h2>
      <p className="font-vilaka whitespace-normal text-center font-bold text-[25px]">
        {training.description}
      </p>
      <img
        className="h-[400px] rounded"
        src="https://www.shutterstock.com/shutterstock/photos/525553219/display_1500/stock-vector-play-video-vector-icon-525553219.jpg"
      />

      <button
        className="border-2 rounded-lg font-topmodern bg-light-1 hover:text-white p-1 w-[100px] self-center"
        onClick={handleSubmit}
      >
        Unirse
      </button>
    </div>
  );
};

export default TrainingCard;
