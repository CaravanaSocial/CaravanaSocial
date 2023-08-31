import React, { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import validation from './validation'

const RegisterCompany = () => {

    const navigate = useNavigate()

    const [companyInput, setCompanyInput] = useState({
            nombre: "",
            apellido:"",
            cargo:"",
            nombreEmpresa:"",
            telefono:"",
            email: "",
            contraseña: "",
            contraseñaRepetida:"",
            descripcion: "",
            paises: [],
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
            apellido:"",
            cargo:"",
            nombreEmpresa:"",
            capacitacion:"",
            telefono:"",
            email: "",
            contraseña: "",
            contraseñaRepetida:"",
            descripcion: "",
            paises: [],
        })
        navigate("/login");
    }


  return (
    <div className='flex flex-row m-9'>
        <div className='bg-black rounded-l-xl w-3/6 h-[700px] text-center'>
            <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure reprehenderit alias id doloribus corporis unde. Eum a, magnam unde dolore velit, accusamus mollitia quasi perferendis repellendus aliquid, dolorem sapiente natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet, optio aspernatur consequatur tempore minus? Voluptatum suscipit vel natus amet molestias dignissimos adipisci ea ipsum beatae. Molestiae nulla quia consectetur!</h3>
        </div>
        

         <div className='bg-green-500 rounded-r-xl w-3/6 h-[700px] '>
            <h3>Registrarme como empresa:</h3>
          <form onSubmit={(event)=>handleSubmit(event)}>
            <div className='flex flex-col w-3/6 '>
            <label>Nombre: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Escribe tu nombre" 
                    name="nombre"/>
                <p style={{visibility: error.nombre ? 'visible' : 'hidden'}}>{error.nombre}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Apellido: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Escribe tu apellido" 
                    name="apellido"/>
                <p style={{visibility: error.apellido ? 'visible' : 'hidden'}}>{error.apellido}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Cargo: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Cargo" 
                    name="cargo"/>
                <p style={{visibility: error.cargo ? 'visible' : 'hidden'}}>{error.cargo}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Empresa: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Nombre de la Empresa" 
                    name="nombreEmpresa"/>
                <p style={{visibility: error.nombreEmpresa ? 'visible' : 'hidden'}}>{error.nombreEmpresa}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Rubro de capacitación: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Rubro de la capacitación" 
                    name="capacitacion"/>
                <p style={{visibility: error.capacitacion ? 'visible' : 'hidden'}}>{error.capacitacion}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Telefono: </label>
                <input 
                    onChange={handleInputs}
                    type="tel"
                    placeholder="Telefono" 
                    name="telefono"/>
                <p style={{visibility: error.telefono ? 'visible' : 'hidden'}}>{error.telefono}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Email: </label>
                <input 
                    onChange={handleInputs}
                    type="text" 
                    placeholder="Email de la empresa..." 
                    name="email"/>
                <p style={{visibility: error.email ? 'visible' : 'hidden'}}>{error.email}</p> 
            </div>

            <div className='flex flex-col w-3/6 '>
            <label>Contraseña</label>
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Contraseña..." 
                    name="contraseña"/>
                <p style={{visibility: error.contraseña ? 'visible' : 'hidden'}}>{error.contraseña}</p> 
            </div>
            <br/>

            <div className='flex flex-col w-3/6 '>
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Repite la Contraseña..." 
                    name="contraseñaRepetida"/>   
                <p style={{visibility: error.contraseñaRepetida ? 'visible' : 'hidden'}}>{error.contraseñaRepetida}</p>
            </div>
    
            <div className='flex flex-col w-3/6 '>
            <label>Pais</label>
                <select onClick={handlePais}>
                    <option value="default">Selecciona el/los pais/es</option>
                    <option value="argentina">Argentina</option>
                    <option value="colombia">Colombia</option>
                    <option value="españa">España</option>
                    <option value="mexico">Mexico</option>
                </select>  
            </div>
            <div className='flex flex-col w-3/6 '>
                <h5>Paises seleccionados:</h5>
                {companyInput.paises.map((p)=>{
                    return (<div> {p}</div>)
                })}
            </div>

            <div className='flex flex-col w-3/6 '>
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
    </div>
  )
}

export default RegisterCompany