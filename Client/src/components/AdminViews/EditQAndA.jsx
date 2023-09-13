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
    <div>
      <input
        className="border-4"
        onChange={handleChange}
        value={input.quest}
        name="quest"
      />
      <textarea
        className="border-4"
        onChange={handleChange}
        value={input.answer}
        name="answer"
      />
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
};

export default EditQAndA;
