import React from "react";
import { useState, useRef } from "react";

export default function CreateTrainings (){
    const addBtn = useRef(null);
    const [video, setVideo] = useState({video: ""});
    const [error, setError] = useState({});
    const [inputTrainings, setInputTrainings] = useState({
        name: "",
        description: "",
        videos: []
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
    }

    const handleChangeVideo = (event) => {
        setVideo({
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitVideo = () => {
        setInputTrainings({
            ...inputTrainings,
            videos: [...inputTrainings.videos, video.video],
        })
      };

    const deleteChoice = (videos, value) => {
        const newValues = inputTrainings[videos].filter((event) => event !== value);
        setInputTrainings({
            ...inputTrainings,
            videos: newValues
        })
    };
    
    const handleSubmit = (event) => {
        if (error.length) {
            event.preventDefault();
        }
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

                <h2>Descripción</h2>
                <textarea className="rounded-3xl px-2 mb-2 bg-zinc-300 text-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-700"
                    type="text"
                    name="description"
                    cols="20"
                    rows="8"
                    value={inputTrainings.description}
                    onChange={handleChange}
                    placeholder="Descripcion..." />

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
                

                <div>
                    {inputTrainings.videos.map((v, i) => {
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
                >Crear</button>
            </div>
            
        </div>
    )
}