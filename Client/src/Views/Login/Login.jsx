import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors, setNewErrors } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalErrors = useSelector((state) => state.errors);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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
          <h1 className="text-4xl text-center  border-b-2 border-lime-600 dark:border-lime-700 rounded-sm dark:text-gray-300">
            Caravana Social
          </h1>
          <p className="dark:text-gray-300">
            Te invitamos a formar parte de la re-evolución inclusiva.
          </p>
        </section>

        <section className=" text-center items-center">
          <div className="justify-center border-spacing-96 border-2 border-lime-600 dark:border-lime-700 rounded-3xl p-4 my-4">
            <h1 className="text-3xl text-center border-b-2 border-lime-600 dark:border-lime-700 dark:text-gray-300">
              Inicio de Sesión
            </h1>

            <input
              className="h-8 rounded-3xl px-2 my-2 bg-gray-100 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              value={userData.email}
            />
            <br />
            <input
              className="h-8 rounded-3xl px-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-600"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={userData.password}
            />
            <br />
            {globalErrors.LOGIN?.error ? (
              <text className="text-red-500">{globalErrors.LOGIN.error}</text>
            ) : null}
            <br />
            <button
              className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-2 my-1 dark:text-gray-300"
              onClick={handleSubmit}
              type="submit"
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

            <Link to="/">
              <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 my-2 dark:text-gray-300">
                Has olvidado tu contraseña?
              </button>
            </Link>
            <h4 className="border-t-2 border-lime-600 dark:border-lime-700 dark:text-gray-200">
              Aun no tienes cuenta?
            </h4>
            <h4 className="dark:text-gray-200">Registrate</h4>
            <Link to="/register-user">
              <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 mr-1 mt-1 dark:text-gray-300">
                Usuario
              </button>
            </Link>
            <Link to="/register-company">
              <button className="bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 ml-1 mt-1 dark:text-gray-300">
                Empresa
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
