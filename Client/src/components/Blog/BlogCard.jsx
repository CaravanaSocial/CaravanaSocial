import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../../Redux/Actions/Actions'

export default function BlogCard(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { post } = props;

  const clickHandler = () => {
    navigate(`/blog/${post.id}`);
  };

  const deleteHandler = (e) => {
    e.preventDefault()
    dispatch (actions.deleteBlog(post.id)).then(()=>{
      dispatch(actions.getAllBlogs())
    })
  }

  return (
    <div>
      <div className="relative">

        {/* Codigo de produccion*/}

        {localStorage.type==="admin" || localStorage.type==="superAdmin"
        ?<button onClick={deleteHandler} className="absolute top-0 right-0 p-2 text-red-600 bg-white rounded-full hover:bg-red-100 hover:text-red-800 transition duration-300 ease-in-out z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        :null
        }

        <div
          onClick={clickHandler}
          className="bg-white rounded-lg p-4 shadow-md text-center hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          style={{ width: "400px" }}
        >
          <img
            src={post.image}
            alt="Blog image"
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        {/* Title */}
        <h1 className="w-full rounded-t-lg mb-1 text-3xl font-bold text-left">
          {post?.title}
        </h1>
        {/* Author */}
        <h2 className="text-xl font-semibold mt-2 text-left mb-2">
          {post?.author}
        </h2>
        {/* date */}
        <p className="text-sm text-right text-gray-600 pr-3">{post?.date}</p>
      </div>
    </div>
  );
}
