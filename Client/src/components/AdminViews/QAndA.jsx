import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQAndA } from "../../Redux/Actions/Actions";

const QAndA = () => {
  const [input, setInput] = useState({
    quest: "",
    answer: "",
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createQAndA(input));
  };
  return (
    <div className="ml-2">
      <br />
      <label className="font-nunito text-[25px]">Pregunta</label>
      <br />
      <textarea
        className=" border-2 rounded focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1 "
        onChange={handleChange}
        name="quest"
        cols={28}
        rows={8}
      />
      <br />
      <label className="font-nunito text-[25px]">Respuesta</label>
      <br />
      <textarea
        cols={28}
        rows={8}
        className=" border-2 rounded focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1 "
        onChange={handleChange}
        name="answer"
      />
      <br />
      <button
        className="font-nunito text-[15px] border-2 bg-light-1 hover:scale-105 rounded p-2 "
        onClick={handleSubmit}
      >
        Publicar pregunta
      </button>
      <br />
      <br />
    </div>
  );
};

export default QAndA;
