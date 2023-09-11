import React, { useEffect } from 'react';
import { detailCompany, getTrainings, getOffers } from '../../Redux/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, NavLink} from 'react-router-dom'


const CompanyDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state)=> state.companyDetail)
    const trainings = useSelector((state) => state.trainings);
    const offers = useSelector((state) => state.offers);

    const companyIdRelacion = trainings.filter((x) => x.companyId === id);
    const companyIdRelOffer = offers.filter((x) => x.companyId === id);

    useEffect(()=>{
        dispatch(detailCompany(id))
        dispatch(getOffers());
        dispatch(getTrainings());
    },[])

  return (
    <div>
        <div>
         <img src={detail?.profilePicture} className="w-[300px] mt-2 mx-2" />
        <h1 className='font-bold text-3xl'>{detail?.nameCompany}</h1>
        <p>{detail?.description}</p>
        <p>Rubros de capacitación:
        {detail?.areaTrainings?.map(a=>{
            return <div><h1>{a.name}</h1></div>
        })}
        </p>
        <p>{detail?.location?.country}, {detail?.location?.state}, {detail?.location?.city}</p>
        <h2>Contacto: {detail?.email} - {detail?.phone}</h2>
        </div>
        <div>
        <h2 className="font-bold">Capacitaciones</h2>
          {companyIdRelacion ? (
            <div className="flex flex-wrap ">
              {companyIdRelacion.map((t) => {
                return (
                  <div className=" mx-1 border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div>
                      {t.name}
                      <div className="flex justify-center">
                        <video
                          src={t.video[0]}
                          controls
                          width="200"
                          height="150"
                        ></video>
                      </div>
                      <NavLink to="/training/detail/:id"><button>Ver detalle</button></NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span>No hay capacitaciones creadas todavia</span>
            </div>
          )}
        </div>
        <div>
        <h2 className="font-bold">Ofertas de trabajo</h2>
          {companyIdRelOffer ? (
            <div className="flex flex-wrap justify-center">
              {companyIdRelOffer.map((o) => {
                return (
                  <div className="border-2 border-light-1 hover:scale-95 bg-white p-4 rounded-3xl shadow-md h-full w-[300px]  justify-center">
                    <div>
                      {o.title}
                      <br />
                      {o.description}
                    </div>
                    <NavLink to="/"><button>Ver detalle</button></NavLink>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <span>No hay ofertas de trabajo todavia</span>
            </div>
          )}
        </div>
    </div>
  )
}

export default CompanyDetail