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
        <div className="min-h-screen max-w-screen pt-10 mb-5">
        {selector?.type === "editor"?(
            <div>
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl">{selector?.title}</h1>
                </div>
            <div className="ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: selector?.template }} /> 
            </div>
            </div>
        ):selector?.type === "twitter"?(
            <div className="flex-col justify-center">
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl">{selector?.title}</h1>
                </div>
                <div className="flex justify-center">
                <TwitterEmbed className='w-[600px] max-lg:w-[340px] mb-5' url={selector.urlData}/>
                </div>
            </div>
        ):selector?.type === "instagram"?(
            <div className="flex-col justify-center">
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl">{selector?.title}</h1>
                </div>
                <div className="flex justify-center">
                <InstagramEmbed className='w-[600px] max-lg:w-[340px] mb-5' url={selector.urlData}/>
                </div>
            </div>
        ):selector?.type === "facebook"?(
            <div className="flex-col justify-center">
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl">{selector?.title}</h1>
                </div>
                <div className="flex justify-center">
                    <FacebookEmbed className='w-[600px] max-lg:w-[340px] mb-5' url={selector.urlData}/>
                </div>
                
            </div>
        ):null}
        
        </div>
    )
} 
