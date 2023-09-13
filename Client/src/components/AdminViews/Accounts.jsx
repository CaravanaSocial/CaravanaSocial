import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAdmins, getCompanies, getUsers } from '../../Redux/Actions/Actions'
const Accounts = () => {
    const {companies, admins, users} = useSelector((state)=>state)

   const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(getAdmins())
    //-----------------------
    dispatch(getCompanies())
    dispatch(getUsers())
    //-----------------------
    dispatch(getDeletedCompanies())
    dispatch(getDeletedUsers())
   },[])


  return (
    <div>
      {

      }
    </div>
  )
}

export default Accounts
