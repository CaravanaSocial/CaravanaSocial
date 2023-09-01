import { useState, useEffect } from "react";
import styles from "./RegisterUser.module.css"
import validation from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getCountry, getCity, getState } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux"


export default function RegisterUser() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const country = useSelector((state)=> state.countries)
    const state = useSelector((state)=> state.states)
    const city = useSelector((state)=> state.cities)
    const [checkboxCUD, setCheckboxCUD] = useState(null);
    const [checkboxFreelancer, setCheckboxFreelancer] = useState(null);
    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState(
        {name: "",
         lastName: "", 
         birthdate: "", 
         location: {country: "", city: "", state: ""}, 
         CUD: "", 
         preferences: "", 
         email: "", 
         password: "",
         certificates: "",
         freelancer: false,
         description: "",
         adress: ""
        }
    )
    useEffect(()=>{
        dispatch(getCountry())
    }, [])

    const handleCheckboxCUDChange = (checkbox) => {
        setCheckboxCUD(checkbox);
        if (checkbox === "NO"){
            delete errors.CUD
        }
        /* if (checkbox === "SI"){
            errors.CUD = "Debe ingresar su código CUD"
        } */
    };

    const handleCheckboxFreeChange = (checkbox) => {
        setCheckboxFreelancer(checkbox);
        if (checkbox === "NO"){
            setUserData({
                ...userData, freelancer: false
            })
            delete errors.description
            delete errors.adress
        }
        if (checkbox === "SI"){
            setUserData({
                ...userData, freelancer: true
            })
            errors.description = "Debe ingresar una descripción de su trabajo"
            errors.adress = "Debe ingresar su geolocalización"
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "country"){
            setUserData({
                ...userData, location: {...userData.location, [name]: value}
            })
            setErrors(validation({
                ...userData, location: {...userData.location, [name]: value}
            }))
            dispatch(getState(value))
        } else if (name === "state"){
            setUserData({
                ...userData, location: {...userData.location, [name]: value}
            })
            setErrors(validation({
                ...userData, location: {...userData.location, [name]: value}
            }))
            dispatch(getCity(value))
        } else if (name === "city"){
            setUserData({
                ...userData, location: {...userData.location, [name]: value}
            })
            setErrors(validation({
                ...userData, location: {...userData.location, [name]: value}
            }))
        } else {
            setUserData({
                ...userData, [name]: value
            })
            setErrors(validation({
                ...userData, [name]: value
            }))
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (Object.keys(errors).length === 0){
            dispatch(createUser(userData))
            navigate("/")
        }
    }


    return (
        <div className={styles.divReg} >
            <h2>REGISTRO</h2>
            <form className={styles.formReg} onSubmit={handleSubmit} >
                <label>Nombre</label>
                <input type='text' name='name' value={userData.name} onChange={handleChange} />
                <p>{ errors.name ? errors.name : null }</p>

                <label>Apellido</label>
                <input type='text' name='lastName' value={userData.lastName} onChange={handleChange} />
                <p>{ errors.lastName ? errors.lastName : null }</p>

                <label>Fecha de Nacimiento</label>
                <input type='date' name='birthdate' value={userData.birthdate} onChange={handleChange} />
                <p>{ errors.birthdate ? errors.birthdate : null }</p>

                <section>
                <label>País </label>
                <select onChange={handleChange} name="country">
                    <option value="default">Seleccioná un país...</option>
                    {country.map((p)=> (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
                <p>{ errors.country ? errors.country : null }</p>
                </section>

                <section>
                <label>Estado/Provincia </label>
                <select onChange={handleChange} name="state">
                    <option value="default">Seleccioná un Estado/Provincia...</option>
                    {state.stateName?.map((s)=> (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <p>{ errors.state ? errors.state : null }</p>
                </section>

                <section>
                <label>Ciudad </label>
                <select onChange={handleChange} name="city">
                    <option value="default">Seleccioná una Ciudad...</option>
                    {city.map((c)=> (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <p>{ errors.city ? errors.city : null }</p>
                </section>

                <label>Tenes Certificado Único de Discapacidad (CUD)?</label>
                <label>SI <input type='checkbox'
                    checked={checkboxCUD === 'SI'}
                    onChange={() => handleCheckboxCUDChange('SI')} /></label>
                <label>NO <input type='checkbox'
                    checked={checkboxCUD === 'NO'}
                    onChange={() => handleCheckboxCUDChange('NO')} /></label>

                {checkboxCUD === "SI" ?
                    <section>
                        <label>Código CUD </label>
                        <input type='text' name='CUD' value={userData.CUD} 
                        onChange={handleChange} 
                        placeholder="CODIGO CUD..." />
                        <p>{ errors.CUD ? errors.CUD : null }</p>
                    </section> : null
                }
                
                <label>Email</label>
                <input type='email' name='email' value={userData.email} onChange={handleChange} />
                <p>{ errors.email ? errors.email : null }</p>

                <label>Contraseña</label>
                <input type='password' name='password' value={userData.password} onChange={handleChange} />
                <p>{ errors.password ? errors.password : null }</p>

                <label>Tipo/s de Preferencia/s</label>
                <select name="preferences">
                    <option value="Default">Seleccionar...</option>
                </select>

                <label>Certificados (Opcional)</label>
                <input type='url' name='certificates' value={userData.certificates} onChange={handleChange} />

                <label>Sos Freelancer?</label>
                <label>SI <input type='checkbox' checked={checkboxFreelancer === 'SI'}
                    onChange={() => handleCheckboxFreeChange('SI')} />
                </label>
                <label>NO <input type='checkbox' checked={checkboxFreelancer === 'NO'}
                    onChange={() => handleCheckboxFreeChange('NO')} />
                </label>

                {checkboxFreelancer === "SI" ? 
                    <section>
                        <label>Descripción de tu Emprendimiento </label>
                        <input type='text' name='description' value={userData.description} onChange={handleChange} />
                        <p>{ errors.description ? errors.description : null }</p>
        
                        <label>Dirección de su negocio </label>
                        <input type='text' name='adress' value={userData.adress} onChange={handleChange} />
                        <p>{ errors.adress ? errors.adress : null }</p>
                    </section> : null
                }
                <br />
                <button type="submit" >REGISTRARME</button>
                <br />
                <section>
                    <Link to={"/register-company"} >Registrarme como Empresa</Link>
                </section>
            </form>
        </div>
    )
}