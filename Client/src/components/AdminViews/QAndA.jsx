import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQAndA, getQAndAs } from "../../Redux/Actions/Actions";
import Swal from "sweetalert2";

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

    dispatch(createQAndA(input)).then(() => {
      dispatch(getQAndAs());
    });
    Swal.fire({
      title: "La pregunta y respuesta se ha publicado con éxito",

      icon: "success",
      customClass: {
        popup: "holahola",
        confirmButton: "bg-light-1",
      },
    });
    setInput({
      quest: "",
      answer: "",
    });
  };
  return (
    <div className="mx-2 text-center">
      <br />
      <label className="font-nunito text-[25px]">Pregunta</label>
      <br />
      <textarea
        value={input.quest}
        className="p-1 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-500 rounded-xl focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1"
        onChange={handleChange}
        name="quest"
        cols={28}
        rows={8}
      />
      <br />
      <label className="font-nunito text-[25px]">Respuesta</label>
      <br />
      <textarea
        value={input.answer}
        cols={28}
        rows={8}
        className="p-1 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-500 rounded-xl focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1 "
        onChange={handleChange}
        name="answer"
      />
      <br />
      <button
        className="font-nunito dark:border-light-2 dark:text-black text-[15px] border-2 bg-light-1 hover:scale-105 rounded-3xl p-2 mt-2"
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
