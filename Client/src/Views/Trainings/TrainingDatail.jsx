import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  createComment,
  acceptTraining,
  clearVideos,
  deleteComment,
} from "../../Redux/Actions/Actions";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { trainingDetail } from "../../Redux/Actions/Actions";
import {AiOutlineDelete} from "../../../node_modules/react-icons/ai"

const DetailTrainings = () => {
  const play = (text) => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const navigate = useNavigate();
  
  const enved = "https://www.youtube.com/embed/";
  const [comments, setComments] = useState({
    description: "",
    userName: localStorage.accName,
    imageUser: localStorage.profilePicture,
  });

  
  const [commentAdded, setCommentAdded] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);
  
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.trainingsDetail);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment(detail.id, comments));
    setCommentAdded(!commentAdded);
    dispatch(trainingDetail(id));
    setComments({ ...comments, description: "" });

    return;
  };

  const handlerChange = (event) => {
    setComments({
      ...comments,
      description: event.target.value,
    });
  };

  const handleApprove = () => {
    dispatch(
      acceptTraining(id, {
        answer: true,
      })
    );
    setCommentAdded(!commentAdded);
    dispatch(trainingDetail(id));
    navigate(-1);
  };

  const handleDecline = () => {
    dispatch(
      acceptTraining(id, {
        answer: false,
      })
    );
    setCommentAdded(!commentAdded);
    dispatch(trainingDetail(id));
    navigate(-1);
  };

  const handleDeleteComment =(commId)=>{
    dispatch(deleteComment(commId))
    dispatch(trainingDetail(id))
    setComments({ ...comments, description: "" });
  }

  useEffect(() => {
    dispatch(trainingDetail(id));

    return () => dispatch(clearVideos());
  }, [commentAdded, updateButton]);

  return (
    <main className="h-full lg:flex lg:flex-row flex flex-col text-center ">
      {localStorage.length !== 0 ? (
        <>
          <div className="flex flex-col items-center p-4">
            <img
              className="w-[300px] rounded-full"
              src={
                detail?.company?.profilePicture
                  ? detail?.company?.profilePicture
                  : detail?.admin?.profilePicture
              }
              alt={detail?.company?.name}
            />
            <span className="font-vilaka font-bold text-[55px] hover:text-light-1">
              {detail?.company?.nameCompany}
            </span>
            <NavLink to={`/company/${detail?.companyId}`}>
              <button className="bg-light-1 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-zinc-900 hover:text-light-2 hover:scale-95 dark:bg-light-2">
                Ver detalle de la empresa
              </button>
            </NavLink>
            <br />
          </div>
          <div className=" w-full">
            {detail?.approved === null && localStorage.type === "superAdmin" ? (
              <>
                <button
                  onClick={() => handleApprove()}
                  className="bg-green-600 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-white hover:bg-green-500 hover:scale-95 mx-4 my-4"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleDecline()}
                  className="bg-red-600 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-white hover:bg-red-500 hover:scale-95 mx-4 my-4 "
                >
                  Rechazar
                </button>
              </>
            ) : detail?.approved === true &&
              localStorage.type === "superAdmin" ? (
              <button
                onClick={() => handleDecline()}
                className="bg-red-600 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-white hover:bg-red-500 hover:scale-95 mx-4 my-4"
              >
                Rechazar
              </button>
            ) : localStorage.type === "superAdmin" ? (
              <button
                onClick={() => handleApprove()}
                className="bg-green-600 font-nunito rounded-3xl font-bold px-2 py-1 border-2 border-transparent dark:text-white hover:bg-green-500 hover:scale-95 mx-4 my-4"
              >
                Aceptar
              </button>
            ) : null}

            <h1 className="font-nunito font-bold text-[55px]">
              {detail?.name}
            </h1>
            <p
              onClick={() => play(detail?.description)}
              className="font-nunito font-bold"
            >
              {detail?.description}
            </p>
            {detail?.video?.map((video, index) => {
              return (
                <div className="flex justify-center" key={index}>
                  {!video.includes("youtube") ? (
                    <video width={840} height={560} controls>
                      <source src={video} type="video/mp4" />
                      Tu navegador no soporta la reproducción de videos.
                    </video>
                  ) : (
                    <iframe
                      src={enved + video.split("=")[1]}
                      width={840}
                      height={560}
                      className="m-6"
                    ></iframe>
                  )}
                </div>
              );
            })}
            <span className="font-nunito font-bold text-[20px]">
              Deja tu comentario sobre esta capacitación:
            </span>
            <br />
            <input
              className=" h-10 w-44 rounded border-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              placeholder="Comenta..."
              type="text"
              value={comments.description}
              onChange={handlerChange}
            />
            <button
              className="bg-light-1 p-2 font-topmodern mx-3 hover:text-white rounded-3xl my-3"
              onClick={handleSubmit}
            >
              Comentar
            </button>
            {detail?.comments?.map((comment, index) => {
              return (
                <div
                  className=" mx-6 w-[800px] flex flex-col items-start my-4 border-b-2 "
                  key={index}
                >
                  <div>
                    {" "}
                    <img
                      className="w-[60px] m-auto rounded-full "
                      src={comment?.imageUser}
                      alt={comment?.userName}
                    />
                  </div>

                  <div className=" mx-4 w-[500px] flex">
                    {" "}
                    <p className="font-nunito font-bold text-[20px]">
                      {comment?.userName}
                    </p>
                  </div>
                  <div className=" mx-4 w-[500px] flex ">
                    <p className="font-nunito  text-start">
                      {comment?.description}
                    </p>
                  </div>
                  {localStorage.type === "superAdmin" ? (
                    <div className=""><button className="bg-red-600 p-1 rounded-3xl hover:bg-red-500" onClick={()=>handleDeleteComment(comment.id)}><AiOutlineDelete/></button></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </main>
  );
};

export default DetailTrainings;
