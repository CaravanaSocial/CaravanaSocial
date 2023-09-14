import React, { useEffect, useState } from 'react'

const Speaching = ({ textNow }) => {
    /* useEffect(()=>{
        play(textNow)
    },[]) */
    const [texto, setTexto] = useState("")

    const handleChange = (event) =>{
        event.preventDefault()
        setTexto(event.target.value)
    }

    const handlePlay = () =>{

      if ('speechSynthesis' in window) {
        // SpeechSynthesis API is supported
        alert("TODO BIENNNN")
        // You can proceed to use it
      } else {
        // SpeechSynthesis API is not supported
        // Handle the lack of support accordingly
        console.error('SpeechSynthesis is not supported in this browser.');
      }
      

        play(textNow)    
    }

    const play = (text)=>{
      speechSynthesis.speak( new SpeechSynthesisUtterance(text))
    }


  return (
    <div>
      {/* <input type="text" placeholder='Escribe algo' onChange={handleChange}/> */}
      <button onClick={handlePlay}>Reproducir</button>
    </div>
  )
}

export default Speaching
