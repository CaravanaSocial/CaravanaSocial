import React, { useState, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {editAdmin, editCompany, editUser, emailVerify, setNewErrors, clearErrors} from "../../Redux/Actions/Actions"
import { useNavigate } from 'react-router-dom'

const PasswordRecovery = () => {
    const globalErrors = useSelector((state)=>state.errors)
    const loginButton = useRef(null);
    const submitButton = useRef(null);
    const dispatch = useDispatch()
    const [randomCode,setRandomCode] = useState(0)
    const [acc,setAcc] = useState({})
    const [emailInput, setEmailInput]= useState()
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setEmailInput(e.target.value)
    }

    const handleKeyPressVerify = (event) => {
        if (event.key === "Enter") {
          loginButton.current.click();
          submitButton.current.click();
        }
    };

    const handleKeyPressSubmit = (event) => {
        if (event.key === "Enter") {
          submitButton.current.click();
        }
    };

    const handleSubmit = (e) =>{
        dispatch(emailVerify(emailInput)).then((verified)=>{
            if(verified?.acc){
                dispatch(clearErrors())
                setAcc(verified)
                setEdit(true)
                var randomCodeMath = Math.round(Math.random()*999999)
                console.log(randomCodeMath)
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
    <div className="flex justify-center items-center h-screen">
        <div className="inline-block m-4 p-4 h-screen">
            <div className="justify-center text-center border-spacing-96 border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 my-4">
                <h1 className="text-2xl font-nunito font-bold dark:font-medium text-[30px] text-center border-b-2 border-light-1 dark:border-light-1 dark:text-gray-300"
                >Cambio de contraseña</h1>
                <br />

                <h2 className="font-nunito font-bold dark:font-medium dark:text-gray-200"
                >Ingresa tu email</h2>
                <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                    type="email"
                    placeholder="Email..."
                    onChange={handleChange}
                    onKeyDown={handleKeyPressVerify}/>
                    
                <p className="text-red-600" style={{ visibility: !/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/.test(emailInput) ? "visible" : "hidden" }} 
                >Formato de email incorrecto</p>
                <p className="text-red-600" style={{ visibility: globalErrors?.EMAIL_VERIFICATION ? "visible" : "hidden" }}
                >{globalErrors?.EMAIL_VERIFICATION}</p>

                <button className="bg-light-1 font-nunito font-bold rounded-3xl p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
                    onClick={()=>handleSubmit()}
                    ref={loginButton}
                >Verificar</button>

                {edit === true ? 
                    <div>
                        <h2 className="font-nunito font-bold dark:font-medium dark:text-gray-200"
                        > Ingrese el código que se envió  a su mail </h2>
                        <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                            type="text"
                            onChange={handleInputsChange}
                            name="code"
                            placeholder="Codigo..."
                            onKeyDown={handleKeyPressSubmit}/>
                        <p style={{ visibility: errors.code ? "visible" : "hidden" }} >{errors.code}</p>

                        <h2 className="font-nunito font-bold dark:font-medium dark:text-gray-200"
                        > Ingrese su nueva contraseña </h2>
                        <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                            type="password"
                            onChange={handleInputsChange}
                            name="password1"
                            placeholder="Nueva contraseña..."
                            onKeyDown={handleKeyPressSubmit}/>
                        <p style={{ visibility: errors.password1 ? "visible" : "hidden" }} >{errors.password1}</p>

                        <h2 className="font-nunito font-bold dark:font-medium dark:text-gray-200"
                        > Ingrese su nueva contraseña nuevamente </h2>
                        <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
                            type="password"
                            onChange={handleInputsChange}
                            name="password2"
                            placeholder="Repite tu contraseña..."
                            onKeyDown={handleKeyPressSubmit}/>
                        <p style={{ visibility: errors.password2 ? "visible" : "hidden" }} >{errors.password2}</p>

                        <button className="bg-light-1 font-nunito font-bold rounded-3xl p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
                            style={isSubmitDisabled
                                ? { opacity: "0.6", cursor: "not-allowed" }
                                : null}
                            disabled={isSubmitDisabled}onClick={changePasswordHandle}
                            ref={submitButton}
                        >Cambiar</button>
                    </div> 
                : null}

                <p style={{ visibility: globalErrors?.PASSWORD_RECOVERY?.error ? "visible" : "hidden" }}>{globalErrors?.PASSWORD_RECOVERY?.error}</p>
        </div>
      </div>
    </div>
  )
}

export default PasswordRecovery
