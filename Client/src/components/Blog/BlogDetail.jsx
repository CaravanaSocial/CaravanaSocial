import React from "react"
// import "quill/dist/quill.snow.css"
import './BlogStyles.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as actions from '../../Redux/Actions/Actions'
import { FacebookEmbed, InstagramEmbed, TwitterEmbed } from "react-social-media-embed"


export default function BlogDetail(){

    const {id} = useParams()
    const selector = useSelector(state=>state.blog)
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(actions.getBlogsByID(id))
    },[])

    return (
        <div className="h-screen pt-10">
        {selector?.type === "editor"?(
            <div className="ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: selector?.template }} /> 
            </div>
        ):selector?.type === "twitter"?(
            <div className="flex justify-center">
                <TwitterEmbed url={selector.urlData}/>
            </div>
        ):selector?.type === "instagram"?(
            <div className="flex justify-center">
                <InstagramEmbed url={selector.urlData}/>
            </div>
        ):selector?.type === "facebook"?(
            <div className="flex justify-center">
                <FacebookEmbed url={selector.urlData}/>
            </div>
        ):null}
        
        </div>
    )
} 
