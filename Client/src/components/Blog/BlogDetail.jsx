import React from "react"
// import "quill/dist/quill.snow.css"
import './BlogStyles.css'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as actions from '../../Redux/Actions/Actions'


export default function BlogDetail(){

    const {id} = useParams()
    const selector = useSelector(state=>state.blog)
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(actions.getBlogsByID(id))
    },[])

    return (
        <div className="ql-snow">
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: selector.template }} /> 
        </div>
    )
} 
