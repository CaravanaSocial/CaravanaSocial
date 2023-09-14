import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQAndA, getQAndAs } from "../../Redux/Actions/Actions";
import EditQAndA from "../../components/AdminViews/EditQAndA.jsx";

const Faq = () => {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs);
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getQAndAs());
  }, [deleted]);

  const handleSubmit = (id) => {
    dispatch(deleteQAndA(id)).then(() => {
      setDeleted(!deleted);
    });
  };

  return (
    <div className="h-full flex   flex-col items-center ">
      {faqs?.map((x) => {
        return (
          <div key={x.id}>
            {" "}
            <div
              className="border-2 border-light-1 justify-between items-center rounded p-2 flex mt-2  w-[1000px]"
              key={x.id}
            >
              {
                <div>
                  <h1 className="font-nunito text-[30px] border-b-2 border-light-1">
                    {x.question}
                  </h1>
                  <h1 className="font-nunito text-[25px]">{x.answer}</h1>
                </div>
              }
              {localStorage?.type === "superAdmin" ? (
                <div>
                  <button
                    onClick={() => setEdit(!edit)}
                    className="mx-5 hover:scale-105 rounded p-1 border-2"
                  >
                    Editar
                  </button>
                  <button
                    className="mx-5 p-1 bg-red-300 font-nunito hover:scale-105 rounded border-2"
                    onClick={() => handleSubmit(x.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ) : null}
            </div>
            <div>
              {" "}
              {edit === true ? (
                <div className="">
                  <EditQAndA
                    question={x.question}
                    answer={x.answer}
                    id={x.id}
                  />{" "}
                </div>
              ) : null}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;

// {
//   localStorage?.type === "superAdmin" ? (
//     <div className="bg-green-500">
//       <EditQAndA question={x.question} answer={x.answer} id={x.id} />{" "}
//     </div>
//   ) : null;
// }
