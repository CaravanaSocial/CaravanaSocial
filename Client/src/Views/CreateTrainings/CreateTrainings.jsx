import React from "react";
import { useState, useRef } from "react";
import Validation from "./Validation"
import { createTraining } from "../../Redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateTrainings (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addBtn = useRef(null);
    const [video, setVideo] = useState({video: ""});
    const [error, setError] = useState({});
    const [inputTrainings, setInputTrainings] = useState({
        companyId: "9c53d9cf-01f4-4909-bce6-2708fcecc936",
        name: "",
        description: "",
        video: []
    });

    console.log(inputTrainings)

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addBtn.current.click();
        }
    }

    const handleChange = (event) => {
        setInputTrainings({
            ...inputTrainings,
            [event.target.name]: event.target.value
        })
        setError(Validation({
            ...inputTrainings,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeVideo = (event) => {
        setVideo({
            [event.target.name]: event.target.value
        })
        setError(Validation({
            ...video,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmitVideo = () => { 
        if (video.video){
            setInputTrainings({
                ...inputTrainings,
                video: [...inputTrainings.video, video.video],
            })
        }
        setVideo({video: ""})
    };

    const deleteChoice = (video, value) => {
        const newValues = inputTrainings[video].filter((event) => event !== value);
        setInputTrainings({
            ...inputTrainings,
            video: newValues
        })
    };
    
    const handleSubmit = (event) => {
        if (error.length) {
            event.preventDefault();
        }
        dispatch(createTraining(inputTrainings))
        navigate("/")
        console.log("Creado");
    };

    return (
        <div className="inline-block m-4 p-4">
            <div className="border-spacing-96 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 my-4">
                <h1 className="text-4xl border-b-2 border-zinc-100 dark:border-zinc-800">Crea una Capacitación</h1>

                <h2>Nombre de la Capacitación</h2>
                <input className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="name"
                    value={inputTrainings.name}
                    onChange={handleChange}
                    placeholder="Nombre..." />
                <br />
                {error.name && <span>{error.name}</span>}

                <h2>Descripción</h2>
                <textarea className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="description"
                    cols="20"
                    rows="8"
                    value={inputTrainings.description}
                    onChange={handleChange}
                    placeholder="Descripcion..." />
                <br />
                {error.description && <span>{error.description}</span>}

                <h2>Video</h2>
                <input className="align-text-top rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="url"
                    name="video"
                    value={video.video}
                    onChange={handleChangeVideo}
                    placeholder="Url..."
                    onKeyDown={handleKeyPress}/>

                <button className="bg-zinc-300 mx-2 px-2 pb-1 text-black rounded-3xl"
                    type="submit"
                    onClick={handleSubmitVideo}
                    ref={addBtn}
                >+</button>
                <br />
                {error.video && <span>{error.video}</span>}
                

                <div>
                    {inputTrainings.video.map((v, i) => {
                        if (i < 7) {
                            return (
                                <div key={i}>
                                    <button className="bg-zinc-300 text-black rounded-3xl m-1 p-2"
                                        type="button"
                                        onClick={() => deleteChoice("videos", v)}
                                    >{v}</button>
                                </div>
                            )
                        }
                    })}
                </div>

                <button className="bg-zinc-300 mt-2 text-black rounded-3xl p-2"
                    type="submit"
                    onClick={handleSubmit}
                >Crear</button>
            </div>
            
        </div>
    )
}