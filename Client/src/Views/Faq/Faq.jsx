import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQAndA, getQAndAs } from "../../Redux/Actions/Actions";
import EditQAndA from "../../components/AdminViews/EditQAndA.jsx";

const Faq = () => {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    dispatch(getQAndAs());
  }, [deleted]);

  const handleSubmit = (id) => {
    dispatch(deleteQAndA(id)).then(() => {
      setDeleted(!deleted);
    });
  };

  return (
    <div className="h-full">
      {faqs?.map((x) => {
        return (
          <div key={x.id}>
            {
              <div>
                <h1>{x.question}</h1>
                <h1>{x.answer}</h1>
              </div>
            }
            {localStorage?.type === "admin" ? (
              <div>
                <button onClick={() => handleSubmit(x.id)}>Eliminar</button>
                <EditQAndA
                  question={x.question}
                  answer={x.answer}
                  id={x.id}
                />{" "}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
