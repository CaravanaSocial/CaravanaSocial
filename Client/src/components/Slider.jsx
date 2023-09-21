import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ children }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 320;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 320;
    }
  };

  return (
    <div className=" flex items-center">
      <MdChevronLeft
        className="opacity-50 hidden md:block cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={100}
      />
      <div
        ref={sliderRef}
        className=" flex p-2    pl-2 2xl:w-[1280px] xl:w-[960px] lg:w-[960px] md:w-[640px] sm:h-[500px] w-[315px]  overflow-x-scroll scroll-smooth  scrollbar scrollbar-hide"
      >
        <div className=" flex space-x-5">{children}</div>
      </div>
      <MdChevronRight
        className="opacity-50 hidden md:block cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={100}
      />
    </div>
  );
};

export default Slider;
