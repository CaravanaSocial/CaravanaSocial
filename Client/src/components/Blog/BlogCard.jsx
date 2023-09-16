import {useNavigate} from 'react-router-dom'

export default function BlogCard(props) {

  const navigate = useNavigate()
  const {post} = props

  const clickHandler = () =>{
    console.log('estoy')
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
          src= 'https://images.ctfassets.net/hrltx12pl8hq/5KiKmVEsCQPMNrbOE6w0Ot/341c573752bf35cb969e21fcd279d3f9/hero-img_copy.jpg?fit=fill&w=600&h=400'
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
