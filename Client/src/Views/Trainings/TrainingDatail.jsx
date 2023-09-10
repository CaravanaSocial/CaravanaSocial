import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createComment } from "../../Redux/Actions/Actions";
import { useParams, NavLink } from "react-router-dom";
import { trainingDetail } from "../../Redux/Actions/Actions";

const DetailTrainings = () => {
  const [comments, setComments] = useState({
    description: "",
    userName: localStorage.accName,
    imageUser: localStorage.profilePicture,
  });

  const { id } = useParams();

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.trainingsDetail);

  const handleSubmit = (event) => {
    dispatch(createComment(detail.id, comments));
    event.preventDefault();
    dispatch(trainingDetail(id));
    setComments({ description: "" });
  };

  const handlerChange = (event) => {
    setComments({
      ...comments,
      description: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(trainingDetail(id));
  }, []);
  return (
    <main className="h-full lg:flex lg:flex-row flex flex-col text-center justify-center">
      <div className=" border-r-2 border-light-1 w-[500px] text-center flex flex-col mx-auto items-center">
        <img
          className="w-[300px]"
          src={detail?.company?.profilePicture}
          alt={detail?.company?.name}
        />
        <NavLink to={`/company/${detail?.companyId}`}>
          <span className="font-topmodern text-[40px]">
            {detail?.company?.nameCompany}
          </span>
        </NavLink>
        <br />
      </div>
      <div className=" w-full">
        <h1 className="font-vilaka font-bold text-[70px]">{detail?.name}</h1>
        <p className="font-topmodern">{detail?.description}</p>
        {detail?.video?.map((video, index) => {
          return (
            <div className="m-auto text-center " key={index}>
              <video className="m-auto" controls width="840" height="560">
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
          );
        })}
        <span className="font-topmodern text-[20px]">
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
          className="bg-light-1 p-2 font-topmodern mx-3 hover:text-white rounded my-3"
          onClick={handleSubmit}
        >
          Comentar
        </button>
        {detail?.comments?.map((comment, index) => {
          return (
            <div className="  w-[500px]  flex" key={index}>
              <div>
                {" "}
                <img
                  className="w-[100px] m-auto rounded-full"
                  src={comment.imageUser}
                  alt={comment.userName}
                />
              </div>

              <div>
                {" "}
                <p className="font-vilaka font-bold text-[30px]">
                  {comment.userName}
                </p>
                <p className="font-topmodern">{comment.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default DetailTrainings;
