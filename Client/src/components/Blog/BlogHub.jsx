import BlogCard from "./BlogCard"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import * as actions from '../../Redux/Actions/Actions'



export default function BlogHub(){
    
    const selector = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(actions.getAllBlogs())
    },[])

    
    return (
        <div className="flex flex-wrap justify-center gap-6 my-10">
            {selector?.map((post, index) => {
                return <BlogCard key={index} post={post}/>
            })}
        </div>
    )
} 
