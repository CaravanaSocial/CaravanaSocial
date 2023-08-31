import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login () {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    
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
        <div className="inline-block m-4 p-4 bg-">
            <section>
                <h1 className="text-4xl">Caravana Social</h1>
                <p>Te invitamos a formar parte de la re-evolución inclusiva.</p>
            </section>

            <section>
                <div className="border-spacing-96 border-gray-400 rounded-3xl max-w-sm p-4 my-4">
                    <h1 className="text-4xl">Inicio de Sesion</h1>
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
                    <Link to="/">
                        <h4>He olvidado mi Contraseña</h4>
                    </Link>
                    <hr />
                    <h4>Aun no tienes cuenta?</h4>
                    <h4>Registrate</h4>
                    <Link to="/register-user">
                        <button>Usuario</button>
                    </Link>
                    <Link to="/register-company">
                        <button>Empresa</button>
                    </Link>
                </div>
            </section>
        </div>
    )
};