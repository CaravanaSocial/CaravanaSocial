import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createComment } from "../../Redux/Actions/Actions";
import { useParams, NavLink } from "react-router-dom";
import { trainingDetail } from "../../Redux/Actions/Actions";

const DetailTrainings = () => {
  const enved = "https://www.youtube.com/embed/";
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
    <div>
      <h1>{detail?.name}</h1>

      <p>{detail?.description}</p>

      {detail?.video?.map((video, index) => {
        return (
          <div key={index}>
            {!video.includes("youtube") ? (
              <video controls width="640" height="360">
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            ) : (
              <iframe
                src={enved + video.split("=")[1]}
                frameborder="0"
              ></iframe>
            )}
          </div>
        );
      })}
      <img
        className="w-[300px]"
        src={detail?.company?.profilePicture}
        alt={detail?.company?.name}
      />
      <NavLink to={`/company/${detail?.companyId}`}>
        <span>{detail?.company?.nameCompany}</span>
      </NavLink>
      <br />
      <span>Deja tu comentario sobre esta capacitación:</span>
      <input
        className="bg-red-200"
        placeholder="Comenta..."
        type="text"
        value={comments.description}
        onChange={handlerChange}
      />
      <button onClick={handleSubmit}>Comentar</button>

      {detail?.comments?.map((comment, index) => {
        return (
          <div key={index}>
            <img
              className="w-[300px]"
              src={comment.imageUser}
              alt={comment.userName}
            />
            <p>{comment.userName}</p>
            <p>{comment.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DetailTrainings;
