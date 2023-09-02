import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../Redux/Actions/Actions";
import Validation from "./Validation";

export default function createJobs (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [inputJobs, setInputJobs] = useState({
        title: "",
        description: ""
    })

    const handleChange = (event) => {
        setInputJobs({
            ...inputJobs,
            [event.target.name]: event.target.value
        })
        setError(Validation({
            ...inputJobs,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (Object.keys(error).length === 0){
            dispatch(createOffer(inputJobs))
            navigate("/")
        }
    }

    return (
        <div className="inline-block m-4 p-4">
            <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 my-4">
                <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800">Crea un Aviso de Trabajo</h1>

                <h2>Nombre del Aviso de Trabajo</h2>
                <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="title"
                    value={inputJobs.title}
                    onChange={handleChange}
                    placeholder="Nombre..." />
                <br />
                {error.title && <span className="text-red-600">{error.title}</span>}

                <h2>Descripción</h2>
                <textarea className="rounded-3xl px-2 py-1 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="description"
                    cols="20"
                    rows="8"
                    value={inputJobs.description}
                    onChange={handleChange}
                    placeholder="Descripcion..." />
                <br />
                {error.description && <span className="text-red-600">{error.description}</span>}

                <button className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
                    type="submit"
                    onClick={handleSubmit}
                >Crear</button>
            </div>
        </div>
    )
}