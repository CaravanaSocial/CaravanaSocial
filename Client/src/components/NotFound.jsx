import React from "react";
import img from "../assets/images/logo.png";
const NotFound = () => {
  return (
    <main className="h-full">
      <div className="text-center mt-5 flex flex-col items-center justify-center">
        <img width={200} height={200} src={img}></img>
        <h1 className="font-nunito text-[35px]">Espacio no encontrado!</h1>
      </div>
    </main>
  );
};

export default NotFound;
