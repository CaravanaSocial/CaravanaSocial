import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getTrainings, getTrainingsByValue } from '../../Redux/Actions/Actions';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {trainingsApproved, trainingsDeclined, trainingsNoCheck} = useSelector((state)=> state)
  const [approvedState, setApproved] = useState(false)
  const [declinedState, setDeclined] = useState(false)
  const [noCheckState, setNocheck] = useState(false)

//   const approvedFiltered = trainingsValue.filter(t => t.approved === true)
//   const declinedFiltered = trainingsValue.filter(t => t.approved === false)
//   const noCheckFiltered = trainingsValue.filter(t => t.approved === null)
  
  const approved = "approved"
  const declined = "declined"
  const noCheck = "noCheck"


//   useEffect(()=>{
//    dispatch(getTrainings())
//   },[])

  const handleTrainingsApproved=(value)=>{
    setApproved(!approvedState)
    dispatch(getTrainingsByValue(value))
  }

  const handleTrainingsDeclined=(value)=>{
    setDeclined(!declinedState)
    dispatch(getTrainingsByValue(value))
  }

  const handleTrainingsNoCheck=(value)=>{
   setNocheck(!noCheckState)
    dispatch(getTrainingsByValue(value))
  }
  return (
    <div>
      
      <button onClick={()=>handleTrainingsApproved(approved) } >Capacitaciones aprobadas</button>
      {approvedState === true ? 
      ( trainingsApproved.length !== 0? (
       trainingsApproved.map((t, i)=>{
        return (<div key={i}>
           <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>  
        </div>)
       })) : <p>No hay capacitaciones aprobadas</p>
    
      ) : null}

      <button onClick={()=>handleTrainingsDeclined(declined)}>Capacitaciones rechazadas</button>
      {declinedState === true ? 
      ( trainingsDeclined.length !== 0 ? (
       trainingsDeclined.map((t, i)=>{
        return (<div key={i}>
            <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>  
                
        </div>)
       })) : <p>No hay capacitaciones rechazadas</p>
    
      ) : null}

      <button onClick={()=>handleTrainingsNoCheck(noCheck)}>Capacitaciones pendientes</button>
      {noCheckState === true ? 
      ( trainingsNoCheck.length !== 0 ? (
       trainingsNoCheck.map((t, i)=>{
        return (<div key={i}>
             <NavLink to={`/training/detail/${t.id}`}>{t.name} </NavLink>    
        </div>)
       })) : <p>No hay capacitaciones pendientes</p>
    
      ) : null}
      
    </div>
  )
}

export default AdminDashboard