import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors, setNewErrors } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector} from "react-redux";
import validation from "./validation";
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode";

export default function Login () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const globalErrors = useSelector((state) => state.errors)
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    };

   
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(userData)).then((postError) =>{
            if (!postError){
                navigate("/home-users")
                dispatch(clearErrors())
            }else{
                dispatch(setNewErrors({type: "LOGIN", error: postError.response.data}))
            }
        })
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
                    <p>{globalErrors.LOGIN?.error ? globalErrors.LOGIN.error : null}</p>
                    <br />
                    <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={userData.email}
                    />
                    <br />
                    <input className="rounded-3xl px-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        value={userData.password}
                    />
                    <br />
                    <button className="bg-zinc-300 mt-2 text-black rounded-3xl"
                        onClick={handleSubmit}
                        type="submit"
                    >Iniciar Sesion</button>
                    <br />
                    <GoogleLogin
                        onSuccess={(CredentialResponse) => {
                            const CredentialResponseDecoded = jwt_decode(CredentialResponse.credential)
                            dispatch(login({
                                email: CredentialResponseDecoded.email,
                                google:true
                            })).then((postError)=>{
                                if(postError){
                                    dispatch(
                                        setNewErrors({
                                            type: "LOGIN",
                                            error: postError.response.data,
                                          })
                                    )
                                }else{
                                    navigate("/home-users")
                                }
                            })
                        }}
                        onError={()=>{
                            console.log("LOGIN FAILED");
                        }}
                    />
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