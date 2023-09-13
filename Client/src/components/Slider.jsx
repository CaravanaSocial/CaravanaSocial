import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ children }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 425;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 425;
    }
  };

  return (
    <div className=" flex items-center">
      <MdChevronLeft
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={150}
      />
      <div
        ref={sliderRef}
        className=" 2xl:w-[1280px] xl:w-[850px] lg:w-[850px] sm:w-[440px] w-[400px] grid h-[600px] overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-hide"
      >
        <div className=" flex space-x-8">{children}</div>
      </div>
      <MdChevronRight
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={150}
      />
    </div>
  );
};

export default Slider;
