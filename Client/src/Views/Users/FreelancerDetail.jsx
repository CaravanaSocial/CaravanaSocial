import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";

const FreelancerDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  const categories = userDetail?.areaTrainings?.map((x) => x.name).join(", ");
  //No se sabe como van a venir los certificados xd. Si los renderizo se rompe.
  const certificates = userDetail?.certificates?.map((x) => x.name).join(", ");

  return (
    <main className=" lg:flex lg:flex-row  flex flex-col h-full justify-center gap-24 items-center  ">
      <div className=" border-2 rounded-lg border-light-1 flex  justify-center  text-center">
        <img className="h-[500px] w-[500px]" src={userDetail?.profilePicture} />
      </div>
      <div className=" text-center ">
        <h1 className="font-topmodern text-light-1 rounded text-[25px]">
          Nombre:{" "}
        </h1>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.name}
        </span>
        <h1 className="font-topmodern text-light-1 text-[25px]">Apellido: </h1>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.lastName}
        </span>
        <h3 className="font-topmodern text-light-1 text-[25px]">
          Descripcion:{" "}
        </h3>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.description}
        </span>
        <h3 className="font-topmodern text-light-1 text-[25px]">
          Fecha de nacimiento:{" "}
        </h3>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.birthDate}
        </span>
      </div>
      <div className=" text-center  ">
        <h3 className="font-topmodern text-light-1 text-[25px]">
          Correo de contacto:{" "}
        </h3>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.email}
        </span>
        <h3 className="font-topmodern text-light-1 text-[25px]">Rubros: </h3>
        <span className="font-vilaka font-bold text-[45px]">{categories}</span>
        {/* <h3>Certificados: {userDetailcertificates}</h3> */}
        <h4 className="font-topmodern text-light-1 text-[25px]">Pais: </h4>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.location?.country}
        </span>
        <h4 className="font-topmodern text-light-1 text-[25px]">
          Estado/Provincia:{" "}
        </h4>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.location?.state}
        </span>
        <h4 className="font-topmodern text-light-1 text-[25px]">Ciudad: </h4>
        <span className="font-vilaka font-bold text-[45px]">
          {userDetail?.location?.city}
        </span>
      </div>
    </main>
  );
};

export default FreelancerDetail;
