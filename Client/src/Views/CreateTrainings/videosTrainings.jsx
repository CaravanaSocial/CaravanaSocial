import { useState, useEffect } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import UploadVideo from "../../components/UploadVideo";
import { useDispatch, useSelector } from "react-redux";
import { editTraining, clearVideos } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/NotFound";


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

  const handleDelete = (event) => {
    event.preventDefault();
    const filteredCat = inputTrainings.video.filter(
      (cat) => cat !== event.target.value
    );
    setInputTrainings({
      ...inputTrainings,
      video: filteredCat,
    });
  };

  const goBack =()=>{
    navigate(-1)
  }

  

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(editTraining(id, { video: [...inputTrainings.video, ...videos] }));
    navigate("/home-trainings");
    dispatch(clearVideos());
    setInputTrainings([]);
  };

  return (
    <div className="h-full text-center">
      {localStorage.length !== 0 && localStorage.type !== "user" ? (
        <div className="inline-block m-4 p-4 text-center ">
          <div className="justify-center text-center border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 m-4">
            <h2 className="text-lg dark:text-gray-300">Video</h2>
            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              type="url"
              name="video"
              value={video.video}
              onChange={handleChangeVideo}
              placeholder="Url..."
            />

            <button
              className="align-middle bg-gray-300 dark:bg-gray-800 mx-2 px-2 pb-1 mb-1 dark:text-gray-300 rounded-3xl border-2 border-transparent hover:border-lime-600 dark:hover:border-lime-700"
              type="submit"
              onClick={handleSubmitVideo}
            >
              +
            </button>
            <br />
            {error.video && <span className="text-red-600">{error.video}</span>}

            {inputTrainings.video.map((cat, i) => {
              return (
                <div key={i}>
                  <button
                    className="bg-gray-300 dark:bg-gray-800 rounded-3xl px-2 py-1 m-1 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500"
                    onClick={handleDelete}
                    value={cat}
                  >
                    {cat}
                  </button>
                </div>
              );
            })}

            <CloudinaryContext cloudName="da785kmjd">
              <div className="App">
                <UploadVideo />
              </div>
            </CloudinaryContext>
            <button className="bg-zinc-300 font-topmodern rounded-3xl p-1 mt-2 mx-1 border-2 border-transparent dark:text-zinc-900 hover:text-light-1 hover:scale-95" 
              onClick={goBack}>Volver</button>

            <button
              className="bg-light-1 font-topmodern rounded-3xl p-1 mt-2 border-2 mx-1 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
              onClick={(e) => handleClick(e)}
             
            >
              Crear
            </button>
          </div>
        </div>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </div>
  );
}
