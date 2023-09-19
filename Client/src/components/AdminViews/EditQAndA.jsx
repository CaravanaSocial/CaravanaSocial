import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getQAndAs, updateQAndA } from "../../Redux/Actions/Actions";

const EditQAndA = ({ question, answer, id }) => {
  const dispatch = useDispatch();

  const [updated, setUpdated] = useState(false);
  const [input, setInput] = useState({
    quest: question,
    answer: answer,
  });

  useEffect(() => {
    dispatch(getQAndAs());
  }, [updated]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setUpdated(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateQAndA(id, input))
      .then(() => {
        setUpdated(true);
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
      });
  };

  return (
    <div className="flex justify-start items-center">
      <textarea
        className="p-1 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-500 rounded-xl focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1 mr-2"
        onChange={handleChange}
        value={input.quest}
        name="quest"
        cols={28}
        rows={8}
      />
      <textarea
        className="p-1 dark:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-500 rounded-xl focus:outline-none focus:border-light-1 focus:ring-1 focus:ring-light-1 ml-2"
        onChange={handleChange}
        value={input.answer}
        name="answer"
        cols={28}
        rows={8}
      />
      <button
        className="ml-5 hover:scale-105 rounded-3xl p-2 bg-light-1 font-nunito"
        onClick={handleSubmit}
      >Guardar</button>
    </div>
  );
};

export default EditQAndA;
