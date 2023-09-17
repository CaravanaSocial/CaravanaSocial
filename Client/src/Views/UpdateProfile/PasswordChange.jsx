import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword }from "../../Redux/Actions/Actions"



const PasswordChange = () => {
    const [passwordChange, setPasswordChange] = useState({
        oldPassword:"",
        newPassword:""
    })
    console.log(localStorage);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setPasswordChange({
            ...PasswordChange,
            [name]:value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changePassword())
    }

    return(
        <div>
            <h1>Cambio de Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <label>Password/contraseña antigua: </label>
                <input 
                type="text"
                name="oldPassword" 
                value={passwordChange.oldPassword}
                onChange={handleChange}
                />

                <br/>
                <p>-------------------------------------------</p>
                <label>Password/contraseña nueva</label>
                <input 
                type="text"
                name="newPassword"
                value={passwordChange.newPassword}
                onChange={handleChange}
                />
                <button>Enviar</button>
            </form>
        </div>
    )
}


export default PasswordChange;