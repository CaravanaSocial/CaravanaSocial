import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {editUser, setNewErrors, getUserById} from "../../Redux/Actions/Actions"

const Verification = () => {
    const {id} = useParams()
    const userDetail = useSelector((state)=>state.userDetail)
    console.log("USERDETAIL: ",userDetail);

    useEffect(()=>{
        dispatch(getUserById(id))
    },[])

    const [code, setCode] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        e.preventDefault()
        setCode(e.target.value)
    }

    const handleSubmit = ()=>{
        
        if(userDetail.verificationCode === Number(code)){
            dispatch(editUser(id, {
                verified: true
            })).then((postError)=>{
                console.log("BOOLEAN",name in postError);
                if("name" in postError){
                    navigate("/login")
                    dispatch(clearErrors());
                }else{
                    dispatch(
                        setNewErrors({ type: "EMAIL_VERIFICATION", error: postError?.response?.data })
                      )
                }
    
            })
        }
    }
  return (
    <div>

      <input onChange={handleChange} type="number" />
      <button onClick={handleSubmit}>Verificar</button>
      {/* <h4>{postError?.response?.data ? postError?.response?.data : null}</h4> */}
    </div>
  )
}

export default Verification
