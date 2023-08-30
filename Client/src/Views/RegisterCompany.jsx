import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'

const RegisterCompany = () => {

    const [companyInput, setCompanyInput] = useState({
        nombre: "",
        email: "",
        contraseña: "",
        paises: [],
        descripcion: "",
        contraseñaRepetida:""
    })


    const handleInputs =(event)=>{
      event.preventDefault();
      setCompanyInput({
        ...companyInput,
        [event.target.name]: event.target.value
      })
    }
    
    const handlePais =(event)=>{
        event.preventDefault();
        const rep = companyInput.paises.find(p => p=== event.target.value)
        if(event.target.value !== "default" && !rep){
            setCompanyInput({
                ...companyInput,
                paises: [...companyInput.paises, event.target.value]
            })
        }
    }

    const handleSubmit =()=>{
        alert("registro con exito");
        setCompanyInput({
            nombre: "",
            email: "",
            contraseña: "",
            paises: [],
            descripcion: "",
            contraseñaRepetida:""
        })
    }
  return (
    <div>
        <h3>Registrarme como empresa:</h3>
        <form onSubmit={handleSubmit}>
            <label>Nombre</label>
                <input 
                    onChange={(event)=>handleInputs(event)}
                    type="text"
                    placeholder="Nombre de la empresa..." 
                    name="nombre"/>

            <label>Email</label>
                <input 
                    onChange={(event)=>handleInputs(event)}
                    type="text" 
                    placeholder="Email de la empresa..." 
                    name="email"/>

            <label>Contraseña</label>
                <input 
                    onChange={(event)=>handleInputs(event)}
                    type="password" 
                    placeholder="Introduce una contraseña..." 
                    name="contraseña"/>

            //hacer la logica para verificar si es igual a la anterior
                <input 
                    type="password" 
                    placeholder="Vuelve a introducir la contraseña..." 
                    name="contraseñaRepetida"/>   

            <label>Pais</label>
            //hacer un map trayendo los paises con redux y renderizar un option por cada uno con su respectivo value
                <select onClick={(event)=>handlePais(event)}>
                    <option value="default">Selecciona el/los pais/es</option>
                    <option value="argentina">Argentina</option>
                    <option value="colombia">Colombia</option>
                    <option value="españa">España</option>
                    <option value="mexico">Mexico</option>
                </select>     

            <label>Descripción</label>
            <textarea  
                    onChange={(event)=>handleInputs(event)}
                    placeholder="Añade una descripción de tu empresa..." 
                    name="descripción"/>   

            <button>Enviar</button>      
        </form>

        <NavLink to="/login"><button>Ya tengo cuenta</button></NavLink>
    </div>
  )
}

export default RegisterCompany