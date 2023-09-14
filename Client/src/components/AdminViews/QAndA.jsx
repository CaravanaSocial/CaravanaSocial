import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQAndA } from "../../Redux/Actions/Actions";
import { NavLink } from "react-router-dom";

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
    <div>
      <br />
      <label>Pregunta</label>
      <input className="border-4" onChange={handleChange} name="quest" />
      <br />
      <label>Respuesta</label>
      <textarea className="border-4" onChange={handleChange} name="answer" />
      <button onClick={handleSubmit}>Publicar pregunta</button>
      <br />
      <NavLink to="/faq">Editar</NavLink>
    </div>
  );
};

export default QAndA;
