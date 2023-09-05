import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ children }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 650;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 650;
    }
  };

  return (
    <div className="relative flex items-center">
      <MdChevronLeft
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={150}
      />
      <div
        ref={sliderRef}
        className=" max-w-full grid h-[600px] overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-hide"
      >
        <div className=" flex space-x-60">{children}</div>
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
