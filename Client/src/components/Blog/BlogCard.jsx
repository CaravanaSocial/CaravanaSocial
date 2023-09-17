import {useNavigate} from 'react-router-dom'

export default function BlogCard(props) {

  const navigate = useNavigate()
  const {post} = props

  const clickHandler = () =>{
    navigate(`/blog/${post.id}`)
  }

  return (
    <div>
      <div
        onClick={clickHandler}
        className="bg-white rounded-lg p-4 shadow-md text-center hover:bg-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        style={{ width: "400px" }}
      >
        <img
          src= {post.image}
          alt="Blog image"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {/* Title */}
          <h1 className="w-full rounded-t-lg mb-1 text-3xl font-bold text-left">{post?.title}</h1>
        {/* Author */}
          <h2 className="text-xl font-semibold mt-2 text-left mb-2">{post?.author}</h2>
        {/* date */}  
          <p className="text-sm text-right text-gray-600 pr-3">{post?.date}</p>
      </div>
    </div>
  );
}
