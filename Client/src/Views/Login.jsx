import React from "react";
import { useState } from "react";

export default function Login () {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    console.log(userData);
    
    const [error, setError] = useState({});

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        //Falta el Validate para el form
        setError("Validation"({
            ...userData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        if (error.length) {
            event.preventDefault();
        }
    };

    return (
        <div>
            <section>
                <h1>Caravana Social</h1>
                <p>Te invitamos a formar parte de la re-evolución inclusiva.</p>
            </section>

            <section>
                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={userData.email}
                    />
                    {error.email && (<span>{error.email}</span>)}
                    <br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={userData.password}
                    />
                    {error.password && (<span>{error.password}</span>)}
                    <br />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                    >Iniciar Sesion</button>
                    <br />
                    <button>Iniciar Sesion con Google</button>
                    <br />
                    <h4>He olvidado mi Contraseña</h4>
                    <hr />
                    <h4>Aun no tienes cuenta?</h4>
                    <h4>Registrate</h4>
                    <button>Usuario</button>
                    <button>Empresa</button>
                </div>
            </section>
        </div>
    )
};