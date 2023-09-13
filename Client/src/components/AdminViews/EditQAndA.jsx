import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getQAndAs, updateQAndA } from '../../Redux/Actions/Actions'

const EditQAndA = ({question, answer, id}) => {
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        quest: question,
        answer: answer
    })

    const handleChange = (event) =>{
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value 
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
            dispatch(updateQAndA(id ,input))
            dispatch(getQAndAs())
            //No borrar. (Se rompe XD)
            dispatch(updateQAndA(id ,input))
            dispatch(getQAndAs())

    }

  return (
    <div>
      <input className='border-4' onChange={handleChange} value={input.quest} name="quest" />
      <textarea className='border-4' onChange={handleChange} value={input.answer} name="answer" />
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  )
}

export default EditQAndA
