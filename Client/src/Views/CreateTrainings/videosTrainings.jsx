import { useState, useEffect } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import UploadVideo from "../../components/UploadVideo";
import { useDispatch, useSelector } from "react-redux";
import { editTraining } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function VideosTrainings() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState({ video: "" });
  const [error, setError] = useState({});
  const videos = useSelector((state) => state.video);
  const { id } = useParams();
  const [inputTrainings, setInputTrainings] = useState({
    video: [],
  });

  const navigate = useNavigate();

  const handleChangeVideo = (event) => {
    setVideo({
      ...video,
      [event.target.name]: event.target.value,
    });
    setError(
      Validation({
        ...inputTrainings,
        ...video,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmitVideo = () => {
    if (video.video) {
      setInputTrainings({
        ...inputTrainings,
        video: [...inputTrainings.video, video.video],
      });
    }
    setVideo({ video: "" });
  };

  const deleteChoice = (video, value) => {
    const newValues = inputTrainings[video].filter((event) => event !== value);
    setInputTrainings({
      ...inputTrainings,
      video: newValues,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(editTraining(id, { video: [...inputTrainings.video, ...videos] }));
    navigate("/home-trainings");
  };

  return (
    <div className="h-full text-center">
      <h2>Video</h2>
      <input
        className="align-text-top rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
        type="url"
        name="video"
        value={video.video}
        onChange={handleChangeVideo}
        placeholder="Url..."
      />

      <button
        className="bg-zinc-300 mx-2 px-2 pb-1 text-black rounded-3xl"
        type="submit"
        onClick={handleSubmitVideo}
      >
        +
      </button>
      <br />
      {error.video && <span className="text-red-600">{error.video}</span>}

      <div>
        {inputTrainings.video.map((v, i) => {
          if (i < 7) {
            return (
              <div key={i}>
                <button
                  className="bg-zinc-300 text-black rounded-3xl m-1 p-2"
                  type="button"
                  onClick={() => deleteChoice("videos", v)}
                >
                  {v}
                </button>
              </div>
            );
          }
        })}
      </div>

      <CloudinaryContext cloudName="da785kmjd">
        <div className="App">
          <UploadVideo />
        </div>
      </CloudinaryContext>

      <button onClick={(e) => handleClick(e)}>SUBMIT</button>
    </div>
  );
}
