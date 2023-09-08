import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFreelancers, getUserById} from '../../Redux/Actions/Actions'
import { useParams } from 'react-router-dom'

const FreelancerDetail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const userDetail = useSelector((state)=>state.userDetail)

    useEffect(()=>{
        dispatch(getUserById(id))
    },[])

    const categories = userDetail?.areaTrainings?.map((x)=>x.name).join(", ")
    //No se sabe como van a venir los certificados xd. Si los renderizo se rompe.
    const certificates = userDetail?.certificates?.map((x)=>x.name).join(", ")

  return (
    <div className="h-full" >
        {console.log("USERDET: ",userDetail)}
        <h1>Nombre: {userDetail.name}</h1>
        <h1>Apellido: {userDetail.lastName}</h1>
        <img src={userDetail.profilePicture}/>
        <h3>Description: {userDetail.description}</h3>
        <h3>Fecha de nacimiento: {userDetail.birthDate}</h3>
        <h3>Correo de contacto: {userDetail.email}</h3>
        <h3>Rubros: {categories}</h3>
        {/* <h3>Certificados: {userDetailcertificates}</h3> */}
        <h4>Pais: {userDetail.location.country}</h4>
        <h4>Estado/Provincia: {userDetail.location.state}</h4>
        <h4>Ciudad: {userDetail.location.city}</h4>
    </div>
  )
}

export default FreelancerDetail
