import { useState } from "react";
import styles from "./RegisterUser.module.css"
import validation from "./validation";
import { Link } from "react-router-dom";

export default function RegisterUser() {

    const [checkboxCUD, setCheckboxCUD] = useState(null);
    const [checkboxFreelancer, setCheckboxFreelancer] = useState(null);
    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState(
        {nombre: "",
         apellido: "", 
         edad: 0, 
         pais: "", 
         CUD: "", 
         preferencias: "", 
         email: "", 
         password: "",
         certificados: [],
         freelancer: false,
         trabajo: "",
         geolocalizacion: ""
        }
    )
    console.log(errors);

    const handleCheckboxCUDChange = (checkbox) => {
        setCheckboxCUD(checkbox);
        if (checkbox === "NO"){
            delete errors.CUD
        }
        if (checkbox === "SI"){
            errors.CUD = "Debe ingresar su código CUD"
        }
    };

    const handleCheckboxFreeChange = (checkbox) => {
        setCheckboxFreelancer(checkbox);
        if (checkbox === "NO"){
            setUserData({
                ...userData, freelancer: false
            })
            delete errors.trabajo
            delete errors.geolocalizacion
        }
        if (checkbox === "SI"){
            setUserData({
                ...userData, freelancer: true
            })
            errors.trabajo = "Debe ingresar una descripción de su trabajo"
            errors.geolocalizacion = "Debe ingresar su geolocalización"
        }
    };

    const handleChange = (event) => {
        const { name, value} = event.target;
        setUserData({
            ...userData, [name]: value
        })
        setErrors(validation({
            ...userData, [name]: value
        }))
    };

    const handleSubmit = (event) => {
        if (Object.keys(errors).length === 0){
            return;
        }else {
            event.preventDefault();
        }
    }


    return (
        <div className={styles.divReg} >
            <h2>REGISTRO</h2>
            <form className={styles.formReg} onSubmit={handleSubmit} >
                <label>Nombre</label>
                <input type='text' name='nombre' value={userData.nombre} onChange={handleChange} />
                <p>{ errors.nombre ? errors.nombre : null }</p>

                <label>Apellido</label>
                <input type='text' name='apellido' value={userData.apellido} onChange={handleChange} />
                <p>{ errors.apellido ? errors.apellido : null }</p>

                <label>Edad</label>
                <input type='number' name='edad' value={userData.edad} onChange={handleChange} />
                <p>{ errors.edad ? errors.edad : null }</p>

                <label>País de Residencia</label>
                <input type='text' name='pais' value={userData.pais} onChange={handleChange} />
                <p>{ errors.pais ? errors.pais : null }</p>

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
                <select name="preferencias">
                    <option value="Default">Seleccionar...</option>
                </select>

                <label>Certificados (Opcional)</label>
                <input type='url' name='certificados' value={userData.certificados} onChange={handleChange} />

                <label>Sos Freelancer?</label>
                <label>SI <input type='checkbox' checked={checkboxFreelancer === 'SI'}
                    onChange={() => handleCheckboxFreeChange('SI')} />
                </label>
                <label>NO <input type='checkbox' checked={checkboxFreelancer === 'NO'}
                    onChange={() => handleCheckboxFreeChange('NO')} />
                </label>

                {checkboxFreelancer === "SI" ? 
                    <section>
                        <label>Descripción de tu Trabajo </label>
                        <input type='text' name='trabajo' value={userData.trabajo} onChange={handleChange} />
                        <p>{ errors.trabajo ? errors.trabajo : null }</p>
        
                        <label>Geolocalización </label>
                        <input type='text' name='geolocalizacion' value={userData.geolocalizacion} onChange={handleChange} />
                        <p>{ errors.geolocalizacion ? errors.geolocalizacion : null }</p>
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