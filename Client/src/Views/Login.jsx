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
        <div className="inline-block m-4 p-4">
            <section>
                <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800 rounded-sm">Caravana Social</h1>
                <p>Te invitamos a formar parte de la re-evolución inclusiva.</p>
            </section>

            <section>
                <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 my-4">
                    <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800">Inicio de Sesion</h1>
                    <br />
                    <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={userData.email}
                    />
                    {error.email && (<span>{error.email}</span>)}
                    <br />
                    <input className="rounded-3xl px-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={userData.password}
                    />
                    {error.password && (<span>{error.password}</span>)}
                    <br />
                    <button className="bg-zinc-300 mt-2 text-black rounded-3xl"
                        onClick={handleSubmit}
                        type="submit"
                    >Iniciar Sesion</button>
                    <br />
                    <button className="bg-zinc-300 my-2 text-black rounded-3xl"
                    >Iniciar Sesion con Google</button>
                    <br />
                    <Link to="/">
                        <h4>He olvidado mi Contraseña</h4>
                    </Link>
                    <hr />
                    <h4>Aun no tienes cuenta?</h4>
                    <h4>Registrate</h4>
                    <Link to="/register-user">
                        <button className="bg-zinc-300 mr-1 text-black rounded-3xl">Usuario</button>
                    </Link>
                    <Link to="/register-company">
                        <button className="bg-zinc-300 ml-1 text-black rounded-3xl">Empresa</button>
                    </Link>
                </div>
            </section>
        </div>
    )
};