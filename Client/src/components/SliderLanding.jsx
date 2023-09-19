import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import SuccessCard from "./SuccessCard.jsx";
import { useEffect } from "react";
import { getSuccesCases } from "../Redux/Actions/Actions.js";

const SliderLanding = () => {
  const dispatch = useDispatch();
  const successCases = useSelector((state) => state.successCases);

  useEffect(() => {
    dispatch(getSuccesCases());
  }, []);

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className=" right-0 absolute top-1/2 hover:scale-150   cursor-pointer "
    >
      <MdChevronRight className="hidden lg:block" size={50} />
    </div>
  );

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      className=" left-0 absolute top-1/2 hover:scale-150 z-10   cursor-pointer "
    >
      <MdChevronLeft className="hidden lg:block " size={50} />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="w-full max-w-screen-xl mb-8  mx-auto mt-8">
      <Slider {...settings}>
        {successCases?.map((caso) => (
          <div key={caso.id}>
            <SuccessCard
              key={caso.id}
              image={caso.image}
              history={caso.history}
              name={caso.name}
              webpage={caso.webpage}
              instagram={caso.ig}
              facebook={caso.fb}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderLanding;
