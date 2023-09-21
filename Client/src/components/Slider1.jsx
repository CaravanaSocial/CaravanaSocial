import { useEffect } from "react";
import CardFreelancer from "./CardFreelancer";
import { useSelector, useDispatch } from "react-redux";
import { getFreelancers } from "../Redux/Actions/Actions";

const Slider1 = () => {
  const dispatch = useDispatch();
  const freelancers = useSelector((state) => state.freelancers);

  useEffect(() => {
    dispatch(getFreelancers());
  }, []);
  return (
    <div className="flex">
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4 md:space-x-2 sm:space-x-0">
          {/* Cartas para pantallas grandes */}
          <div className="w-full flex md:w-1/3 ">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
          <div className="w-full md:w-1/3 inline-block">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
          <div className="w-full md:w-1/3 inline-block">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
          {/* Cartas para pantallas medianas */}
          <div className="w-full sm:w-1/2 md:hidden inline-block">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
          <div className="w-full sm:w-1/2 md:hidden inline-block">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
          {/* Cartas para pantallas pequeñas */}
          <div className="w-full sm:hidden inline-block">
            {freelancers?.map((freelancer) => (
              <CardFreelancer key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider1;
