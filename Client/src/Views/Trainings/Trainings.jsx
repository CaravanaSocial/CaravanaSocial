import TrainingCard from "./CardTrainings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTraining } from "../../Redux/Actions/Actions";
import { useEffect } from "react";

const Trainings = () => {
  const trainings = useSelector((state) => state.trainings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTraining());
  }, []);

  console.log("trainings", trainings);
  return (
    <div>
      <h1>Entrenamientos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainings.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </div>
    </div>
  );
};

export default Trainings;
