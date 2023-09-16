import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {editAdmin, editCompany, editUser, emailVerify, setNewErrors, clearErrors} from "../../Redux/Actions/Actions"
import { useNavigate } from 'react-router-dom'

const PasswordRecovery = () => {
    const globalErrors = useSelector((state)=>state.errors)
    const dispatch = useDispatch()
    const [randomCode,setRandomCode] = useState(0)
    const [acc,setAcc] = useState({})
    const [emailInput, setEmailInput]= useState()
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setEmailInput(e.target.value)
    }

    const handleSubmit = (e) =>{
        dispatch(emailVerify(emailInput)).then((verified)=>{
            if(verified?.acc){
                dispatch(clearErrors())
                setAcc(verified)
                setEdit(true)
                var randomCodeMath = Math.round(Math.random()*999999)
                setRandomCode(randomCodeMath)
                //Acá se mandaría el mail xd
            }else{
                dispatch(setNewErrors({type: "EMAIL_VERIFICATION", error:verified?.response?.data?.error}))
            }
        })
    }
    const [inputs, setInputs] = useState({
        code:"",
        password1:"",
        password2:""
    })
    const [errors, setErrors] = useState({
        code:"",
        password1:"",
        password2:""
    })
    const handleInputsChange = (e) =>{
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
        setErrors(inputValidation({
            ...inputs,
            [e.target.name]:e.target.value
        }))
    }
    const inputValidation = (i)=>{
        const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const errors = {}
        if(isNaN(i.code)) errors.code="El código debe ser un número"
        if (!regexPass.test(i.password1)) errors.password1 = "La contraseña debe tener como mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número"
        if(i.password1!==i.password2) errors.password2="Las contraseñas deben ser iguales"
        return errors
    }
    const changePasswordHandle = ()=>{
        if(Number(randomCode) === Number(inputs.code)){
            if(acc.type === "company"){
                dispatch(editCompany(acc.acc.id,{
                    password: inputs.password2
                })).then((editError)=>{
                    if(!editError){
                        navigate("/login")
                    }dispatch(setNewErrors({type: "PASSWORD_RECOVERY", error:editError?.response?.data?.error}))
                })
            }else if(acc.type === "admin" || acc.type === "superAdmin"){
                dispatch(editAdmin(acc.acc.id,{
                    password: inputs.password2
                })).then((editError)=>{
                    if("name" in editError){
                        navigate("/login")
                    }dispatch(setNewErrors({type: "PASSWORD_RECOVERY", error:editError?.response?.data?.error}))
                }) 
            }else if(acc.type === "user"){
                dispatch(editUser(acc.acc.id,{
                    password: inputs.password2
                })).then((editError)=>{
                    if("name" in editError){
                        navigate("/login")
                    }dispatch(setNewErrors({type: "PASSWORD_RECOVERY", error:editError?.response?.data?.error}))
                })
            } 
        }
    }

    const isSubmitDisabled = Object.keys(errors).length > 0;
  return (
    <div>
    <label>Ingrese su mail</label>
      <input type="text" onChange={handleChange}/>
      <p style={{ visibility: !/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/.test(emailInput) ? "visible" : "hidden" }} >Formato de email incorrecto</p>
      <h1 className="text-red-600" style={{ visibility: globalErrors?.EMAIL_VERIFICATION ? "visible" : "hidden" }}>{globalErrors?.EMAIL_VERIFICATION}</h1>
      <button onClick={()=>handleSubmit()}>Verificar</button>
      {
        edit === true ? 
        <div>
            <label> Ingrese el código que se envió  a su mail </label>
            <input type="text" onChange={handleInputsChange} name="code"/>
            <p style={{ visibility: errors.code ? "visible" : "hidden" }} >{errors.code}</p>
            <label> Ingrese su nueva contraseña </label>
            <input type="text" onChange={handleInputsChange} name="password1"/>
            <p style={{ visibility: errors.password1 ? "visible" : "hidden" }} >{errors.password1}</p>
            <label> Ingrese su nueva contraseña nuevamente </label>
            <input type="text" onChange={handleInputsChange} name="password2"/>
            <p style={{ visibility: errors.password2 ? "visible" : "hidden" }} >{errors.password2}</p>
            <button style={
              isSubmitDisabled
                ? { opacity: "0.6", cursor: "not-allowed" }
                : null
            }
            disabled={isSubmitDisabled}onClick={changePasswordHandle}>Cambiar</button>
        </div> 
        : null 
      }
      <h1 style={{ visibility: globalErrors?.PASSWORD_RECOVERY?.error ? "visible" : "hidden" }}>{globalErrors?.PASSWORD_RECOVERY?.error}</h1>
    </div>
  )
}

export default PasswordRecovery
