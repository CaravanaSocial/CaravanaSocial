import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companyButtons } from "../../Redux/Actions/Actions";
import React, {useEffect} from "react";

const HomeUsers = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(localStorage.type === "company"){
      dispatch(companyButtons(true))
    }else{
      dispatch(companyButtons(false))
    }   
  },[dispatch])

  const data = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtJ3u0vIXfn2Ywm3OSbevjXdWpG0mShZ6uA&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5a317T68xcpuX9na_LCx-_5ZCemdgTYIlbw&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQT5mOuP9zq13qg_m4IgpYeaaMwpOOXm9DNg&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ZreaT2y65wLN-Sncug77dsn2Dj6PmCu5Zg&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ejWCaeLYhNpr8miCEV4_flwazMDZBl1Cww&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVPpN26_js1DlIOl9H56Ths314CtO8gQcRq8QVACztUDTKcXrUkjY1EBoaTU0iER9gB74&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlWjxh6xN96-51YEDn48K-wWFE-XFf-DjbA&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtJ3u0vIXfn2Ywm3OSbevjXdWpG0mShZ6uA&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5a317T68xcpuX9na_LCx-_5ZCemdgTYIlbw&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQT5mOuP9zq13qg_m4IgpYeaaMwpOOXm9DNg&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ZreaT2y65wLN-Sncug77dsn2Dj6PmCu5Zg&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ejWCaeLYhNpr8miCEV4_flwazMDZBl1Cww&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVPpN26_js1DlIOl9H56Ths314CtO8gQcRq8QVACztUDTKcXrUkjY1EBoaTU0iER9gB74&usqp=CAU",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlWjxh6xN96-51YEDn48K-wWFE-XFf-DjbA&usqp=CAU",
    },
  ];

  const slideLeft = (event) => {
    var slider = document.getElementById("slider");

    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = (event) => {
    var slider = document.getElementById("slider");

    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const slideLeft1 = (event) => {
    var slider = document.getElementById("slider1");

    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight1 = (event) => {
    var slider = document.getElementById("slider1");
    console.log("sliderrrrrrrrrrr", slider);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const slideLeft2 = (event) => {
    var slider = document.getElementById("slider2");

    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight2 = (event) => {
    var slider = document.getElementById("slider2");

    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleCap =()=>{
    navigate("/trainings/")
  }

  const handleOffer =()=>{
    navigate("/offers")
  }

  return (
    <main className="flex p-7">
      {localStorage.length !== 0 ? (
        <div>
          {" "}
          <div className=" w-[300px]"></div>
          <div className=" w-full h-full">
            <section className="p-2">
              <div className="font-vilaka flex font-bold  text-[40px]">
                CAPACITACIONES RECIENTES
              </div>

              <div className="relative flex items-center">
                <MdChevronLeft
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={slideLeft1}
                  size={40}
                />
                <div
                  id="slider1"
                  className="w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-hide"
                >
                  {" "}
                  {data.map((item) => (
                    <img
                      className="w-[220px] h-[200px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                      src={item.img}
                      alt="/"
                    ></img>
                  ))}
                </div>
                <MdChevronRight
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={slideRight1}
                  size={40}
                />
              </div>
              <button onClick={()=>handleCap()}className="font-topmodern border-2  self-end hover:text-light-1 items-end  border-light-1 rounded p-1 ">
                Ver Mas
              </button>
            </section>
            <section className="p-2">
              <div className="font-vilaka font-bold flex text-[40px]">
                OFERTAS RECIENTES
              </div>

              <div className="relative flex items-center ">
                <MdChevronLeft
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={slideLeft2}
                  size={40}
                />
                <div
                  id="slider2"
                  className="w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar scrollbar-hide"
                >
                  {" "}
                  {data.map((item) => (
                    <img
                      className="w-[220px] h-[200px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                      src={item.img}
                      alt="/"
                    ></img>
                  ))}
                </div>
                <MdChevronRight
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={slideRight2}
                  size={40}
                />
              </div>
              <button onClick={()=>handleOffer()} className="font-topmodern border-2  hover:text-light-1  border-light-1 rounded p-1 ">
                Ver Mas
              </button>
            </section>
          </div>
        </div>
      ) : (
        <div className="font-vilaka text-[50px] ">
          Debes ingresar primero para ver este contenido :)
        </div>
      )}
    </main>
  );
};

export default HomeUsers;
