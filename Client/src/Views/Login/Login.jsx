import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors, setNewErrors } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Speaching from "../../components/Speaching";

import Swal from "sweetalert2";


export default function Login() {
  useEffect(() => {
    play("Inicia sesión");
  }, []);

  const play = (text) => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const loginButton = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalErrors = useSelector((state) => state.errors);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      loginButton.current.click();
    }
  };

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(userData)).then((postError) => {
      if (!postError) {
        Swal.fire({
          title: "Inicio de sesión exitoso!",
          text: "Bienvenido",
          icon: "success",
          customClass: {
            popup: "inicioSesion",
          },
          iconColor: "#a7b698",
          confirmButtonColor: "#a7b698",
        });

        navigate("/home");
        dispatch(clearErrors());
      } else {
        dispatch(
          setNewErrors({ type: "LOGIN", error: postError.response.data })
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      <div className="inline-block m-4  p-4 h-screen">
        <section>
          <h1
            onClick={() => play("Caravana Social")}
            name="title"
            className="text-4xl font-vilaka font-bold text-[50px] text-center  border-b-2 border-light-1 dark:border-light-1 rounded-sm dark:text-gray-300"
          >
            Caravana Social
          </h1>
          <p
            onClick={() =>
              play("Te invitamos a formar parte de la re-evolución inclusiva.")
            }
            className=" font-nunito font-bold dark:font-medium text-[20px] dark:text-gray-300"
          >
            Te invitamos a formar parte de la re-evolución inclusiva.
          </p>
        </section>

        <section className="text-center items-center">
          <div className="justify-center border-spacing-96 border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 my-4">
            <h1
              onClick={() => play("Inicio de Sesión")}
              className="text-2xl font-nunito font-bold dark:font-medium text-[30px] text-center border-b-2 border-light-1 dark:border-light-1 dark:text-gray-300"
            >
              Inicio de Sesión
            </h1>

            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              value={userData.email}
              onKeyDown={handleKeyPress}
            />
            <br />
            <input
              className="h-8 rounded-3xl px-2 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={userData.password}
              onKeyDown={handleKeyPress}
            />
            <br />
            {globalErrors?.LOGIN?.error ? (
              <text className="text-red-500">{globalErrors.LOGIN.error}</text>
            ) : null}
            <br />
            <button
              className="bg-light-1 font-nunito font-bold rounded-3xl p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95"
              onClick={handleSubmit}
              type="submit"
              ref={loginButton}
            >
              Iniciar Sesión
            </button>
            <br />
            <div className="mt-1 w-[223px] inline-block">
              <GoogleLogin
                onSuccess={(CredentialResponse) => {
                  const CredentialResponseDecoded = jwt_decode(
                    CredentialResponse.credential
                  );
                  dispatch(
                    login({
                      email: CredentialResponseDecoded.email,
                      google: true,
                    })
                  ).then((postError) => {
                    if (postError) {
                      dispatch(
                        setNewErrors({
                          type: "LOGIN",
                          error: postError.response.data,
                        })
                      );
                    } else {
                      navigate("/home");
                    }
                  });
                }}
                onError={() => {
                  console.log("LOGIN FAILED");
                }}
              />
            </div>
            <br />

            {/* <Link to="/">
              <button className="bg-gray-300 font-topmodern dark:bg-gray-800 rounded-3xl p-2 my-2 dark:text-gray-300 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1">
                Has olvidado tu contraseña?
              </button>
            </Link> */}
            <h4
              onClick={() => play("¿Aún no tienes cuenta? Registrate")}
              className="border-t-2 font-nunito font-bold dark:font-medium border-light-1 dark:border-light-1 dark:text-gray-200"
            >
              ¿Aún no tienes cuenta? Registrate
            </h4>
            {/* <h4 className="dark:text-gray-200 font-nunito  font-bold dark:font-medium">Registrate</h4> */}
            <Link to="/register-user">
              <button className="bg-gray-300 font-nunito font-bold dark:font-medium dark:bg-gray-800 rounded-3xl p-2 mr-1 mt-1 dark:text-gray-300 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1">
                Usuario
              </button>
            </Link>
            <Link to="/register-company">
              <button className="bg-gray-300 font-nunito font-bold dark:font-medium dark:bg-gray-800 rounded-3xl p-2 ml-1 mt-1 dark:text-gray-300 border-2 border-transparent hover:border-light-1 dark:hover:border-light-1">
                Empresa
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
