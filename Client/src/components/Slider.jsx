import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ children }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 435;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 435;
    }
  };

  return (
    <div className=" flex items-center">
      <MdChevronLeft
        className="opacity-50 hidden sm:block cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={100}
      />
      <div
        ref={sliderRef}
        className="  pl-2 2xl:w-[1280px] xl:w-[850px] lg:w-[850px] sm:w-[430px] w-[250px] grid h-[440px] sm:h-[620px] overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-hide"
      >
        <div className=" flex space-x-8">{children}</div>
      </div>
      <MdChevronRight
        className="opacity-50 hidden sm:block cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={100}
      />
    </div>
  );
};

export default Slider;
