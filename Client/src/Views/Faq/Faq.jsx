import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQAndAs } from "../../Redux/Actions/Actions";
import EditQAndA from "../../components/AdminViews/EditQAndA.jsx";

const Faq = () => {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(getQAndAs());
  }, []);

  return (
    <div className="h-full">
      {console.log(faqs)}
      {faqs.map((x, i) => {
        return (
          <div key={i}>
            {
              <div>
                <h1>{x.question}</h1>
                <h1>{x.answer}</h1>
              </div>
            }
            <EditQAndA question={x.question} answer={x.answer} id={x.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
