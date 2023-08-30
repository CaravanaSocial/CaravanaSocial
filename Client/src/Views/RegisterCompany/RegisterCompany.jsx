import React, { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import validation from './validation'

const RegisterCompany = () => {

    const navigate = useNavigate()

    const [companyInput, setCompanyInput] = useState({
        nombre: "",
        email: "",
        contraseña: "",
        paises: [],
        descripcion: "",
        contraseñaRepetida:""
    })

    const [error, setError] = useState({})


    const handleInputs =(event)=>{
      event.preventDefault();
      setCompanyInput({
        ...companyInput,
        [event.target.name]: event.target.value
      })
      setError(validation({
        ...companyInput,
        [event.target.name]: event.target.value
      }))
    }

    const validateInput = (inputData) =>{
        const errors = validation(inputData)
        setError(errors)
      }
    
    const handlePais =(event)=>{
        event.preventDefault();
        const rep = companyInput.paises.find(p => p=== event.target.value)
        if(event.target.value !== "default" && !rep){
            setCompanyInput({
                ...companyInput,
                paises: [...companyInput.paises, event.target.value]
            })
            validateInput({
                ...companyInput, 
                paises: [...companyInput.paises, event.target.value]
            })
        }
    }

  

    const isSubmitDisabled = Object.keys(error).length > 0;

    const handleSubmit =()=>{
        //dispatch para el post
        //action para borrar los errores
        //manejar errores con estado global
        alert("registro con exito");
        setCompanyInput({
            nombre: "",
            email: "",
            contraseña: "",
            paises: [],
            descripcion: "",
            contraseñaRepetida:""
        })
        navigate("/login");
    }
  return (
    <div>
        <h3>Registrarme como empresa:</h3>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div>
            <label>Nombre</label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Nombre de la empresa..." 
                    name="nombre"/>
                <p style={{visibility: error.nombre ? 'visible' : 'hidden'}}>{error.nombre}</p> 
            </div>

            <div>
            <label>Email</label>
                <input 
                    onChange={handleInputs}
                    type="text" 
                    placeholder="Email de la empresa..." 
                    name="email"/>
                <p style={{visibility: error.email ? 'visible' : 'hidden'}}>{error.email}</p> 
            </div>

            <div>
            <label>Contraseña</label>
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Contraseña..." 
                    name="contraseña"/>
                <p style={{visibility: error.contraseña ? 'visible' : 'hidden'}}>{error.contraseña}</p> 
            </div>

            <div>
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Repite la Contraseña..." 
                    name="contraseñaRepetida"/>   
                <p style={{visibility: error.contraseñaRepetida ? 'visible' : 'hidden'}}>{error.contraseñaRepetida}</p>
            </div>
    
            <div>
            <label>Pais</label>
                <select onClick={handlePais}>
                    <option value="default">Selecciona el/los pais/es</option>
                    <option value="argentina">Argentina</option>
                    <option value="colombia">Colombia</option>
                    <option value="españa">España</option>
                    <option value="mexico">Mexico</option>
                </select>  
            </div>
            <div>
                <h5>Paises seleccionados:</h5>
                {companyInput.paises.map((p)=>{
                    return (<div> {p}</div>)
                })}
            </div>

            <div>
            <label>Descripción</label>
            <textarea  
                    onChange={handleInputs}
                    placeholder="Añade una descripción de tu empresa..." 
                    name="descripcion"/>   
                <p style={{visibility: error.descripcion ? 'visible' : 'hidden'}}>{error.descripcion}</p>
            </div>

            <hr />
            <button disabled={isSubmitDisabled} type="submit">Enviar</button>      
        </form>

        <NavLink to="/login"><button>Ya tengo cuenta</button></NavLink>
    </div>
  )
}

export default RegisterCompany