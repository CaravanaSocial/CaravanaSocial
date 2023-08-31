import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import validation from './validation'
import {getCountry, getState} from '../../Redux/Actions/Actions'

const RegisterCompany = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const country = useSelector((state)=> state.countries)
    const state = useSelector((state)=> state.states)
    const city = useSelector((state)=> state.cities)

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
            location: {},
    })

    const [error, setError] = useState({})

    useEffect(()=>{
        dispatch(getCountry())
    })


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


    const handleLocation=(event)=>{
        event.preventDefault();
        setCompanyInput({
            ...companyInput,
            location : {...companyInput, [event.target.name]: event.target.value}
        })  
        if(companyInput.state !== "undefined"){
            dispatch(getState(companyInput.state))
        }
        if(companyInput.city !== "undefined"){
            dispatch(getCity(companyInput.city))
        }
    }

  

    const isSubmitDisabled = Object.keys(error).length > 0;

    const handleSubmit =()=>{
        dispatch(createCompany())
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
            location: {},
        })
        navigate("/login");
    }


  return (
    <div >
        <div >
            <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure reprehenderit alias id doloribus corporis unde. Eum a, magnam unde dolore velit, accusamus mollitia quasi perferendis repellendus aliquid, dolorem sapiente natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eveniet, optio aspernatur consequatur tempore minus? Voluptatum suscipit vel natus amet molestias dignissimos adipisci ea ipsum beatae. Molestiae nulla quia consectetur!</h3>
        </div>
        

         <div >
            <h3>Registrarme como empresa:</h3>
          <form onSubmit={(event)=>handleSubmit(event)}>
            <div >
            <label>Nombre: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Escribe tu nombre" 
                    name="nombre"/>
                <p style={{visibility: error.nombre ? 'visible' : 'hidden'}}>{error.nombre}</p> 
            </div>

            <div >
            <label>Apellido: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Escribe tu apellido" 
                    name="apellido"/>
                <p style={{visibility: error.apellido ? 'visible' : 'hidden'}}>{error.apellido}</p> 
            </div>

            <div >
            <label>Cargo: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Cargo" 
                    name="cargo"/>
                <p style={{visibility: error.cargo ? 'visible' : 'hidden'}}>{error.cargo}</p> 
            </div>

            <div >
            <label>Empresa: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Nombre de la Empresa" 
                    name="nombreEmpresa"/>
                <p style={{visibility: error.nombreEmpresa ? 'visible' : 'hidden'}}>{error.nombreEmpresa}</p> 
            </div>

            <div>
            <label>Rubro de capacitación: </label>
                <input 
                    onChange={handleInputs}
                    type="text"
                    placeholder="Rubro de la capacitación" 
                    name="capacitacion"/>
                <p style={{visibility: error.capacitacion ? 'visible' : 'hidden'}}>{error.capacitacion}</p> 
            </div>

            <div >
            <label>Telefono: </label>
                <input 
                    onChange={handleInputs}
                    type="tel"
                    placeholder="Telefono" 
                    name="telefono"/>
                <p style={{visibility: error.telefono ? 'visible' : 'hidden'}}>{error.telefono}</p> 
            </div>

            <div >
            <label>Email: </label>
                <input 
                    onChange={handleInputs}
                    type="text" 
                    placeholder="Email de la empresa..." 
                    name="email"/>
                <p style={{visibility: error.email ? 'visible' : 'hidden'}}>{error.email}</p> 
            </div>

            <div >
            <label>Contraseña</label>
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Contraseña..." 
                    name="contraseña"/>
                <p style={{visibility: error.contraseña ? 'visible' : 'hidden'}}>{error.contraseña}</p> 
            </div>
            <br/>

            <div >
                <input 
                    onChange={handleInputs}
                    type="password" 
                    placeholder="Repite la Contraseña..." 
                    name="contraseñaRepetida"/>   
                <p style={{visibility: error.contraseñaRepetida ? 'visible' : 'hidden'}}>{error.contraseñaRepetida}</p>
            </div>
    
            <div>
                <select onClick={handleLocation} name="country">
                    <option value="default">pais</option>
                  {country.map((p)=>{
                    return <option value={p}>{p}</option>
                  })}

                </select>
            </div>
            <div>
                <select onClick={handleLocation} name="state">
                    <option value="default">estado</option>
                    {state?.map((p)=>{
                    return <option value={p}>{p}</option>
                    })}

                </select>
            </div>
            <div>
                <select onClick={handleLocation} name="city">
                    <option value="default">ciudad</option>
                    {city?.map((p)=>{
                    return <option value={p}>{p}</option>
                    })}

                </select>
            </div>

            <div >
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