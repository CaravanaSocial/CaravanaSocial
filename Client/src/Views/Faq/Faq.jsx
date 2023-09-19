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

  const handleDelete = (id) => {
    dispatch(deleteQAndA(id)).then(() => {
      setDeleted(!deleted);
    });
  };

  const handleEdit = (value) => {
    if (edit === value){
      setEdit(false);
    } else {
      setEdit(value)
    }
  }

  return (
    <div className="h-full flex flex-col items-center ">
      {faqs?.map((x) => {

        return (
          <div className="w-full" key={x.id}>
            <div
              className="border-2 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-500 bg-gray-200 justify-between items-center rounded-xl p-2 flex my-2"
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
                    onClick={() => handleEdit(x.id)}
                    className="mx-5 hover:scale-105 rounded-3xl p-2 bg-light-1 font-nunito"
                  >
                    Editar
                  </button>
                  <button
                    className="mx-5 my-2 hover:scale-105 rounded-3xl p-2 bg-red-300 font-nunito"
                    onClick={() => handleDelete(x.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ) : null}
            </div>
            <div>
              {" "}
              {edit === x.id ? (
                <div>
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
