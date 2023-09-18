import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFreelancers, getUserById } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FreelancerDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(id));
    return () => {
      dispatch(clearFreelancers());
    };
  }, [id]);

  const categories = userDetail?.areaTrainings?.map((x) => x.name).join(", ");
  //No se sabe como van a venir los certificados xd. Si los renderizo se rompe.
  const certificates = userDetail?.certificates?.map((x) => x.name).join(", ");

  function calcularEdad() {
    const hoy = new Date();
    const fechaNac = new Date(userDetail?.birthDate);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth() + 1;
    const mesNacimiento = fechaNac.getMonth() + 1;

    if (mesActual < mesNacimiento) {
      edad--;
    } else if (mesActual === mesNacimiento) {
      const diaActual = hoy.getDate();
      const diaNacimiento = fechaNac.getDate();
      if (diaActual < diaNacimiento) {
        edad--;
      }
    }
    return edad;
  }

  return (
    <div className="h-full">
      {localStorage.length !== 0 ? (
        <div className="flex justify-center">
          <div className="max-w-4xl justify-center text-center border-2 border-light-1 rounded-3xl p-2 m-4">
            <div className="flex justify-around items-center">
              <img
                className="w-52 max-lg:w-20 max-lg:h-20 rounded-full border-2 border-light-1"
                src={userDetail?.profilePicture}
              />

              <div className="text-start border-l-2 border-light-1 ml-2 pl-2">
                <h2 className="text-2xl max-lg:text-xl">
                  {userDetail?.name} {userDetail?.lastName}
                </h2>

                <h2 className="text-2xl max-lg:text-lg text-gray-700 dark:text-gray-400">
                  {userDetail?.location?.country +
                    ", " +
                    userDetail?.location?.state +
                    ", " +
                    userDetail?.location?.city}
                </h2>

                <h2 className="text-2xl max-lg:text-lg text-gray-700 dark:text-gray-400">
                  {calcularEdad()} años.
                </h2>
              </div>
            </div>

            <div className="border-t-2 border-light-1 dark:border-light-1 my-4" />

            <div className="justify-center items-center">
              <div className="flex justify-center">
                <h1 className="text-2xl max-lg:text-xl text-light-2 dark:text-light-1 mr-2">
                  Correo de contacto:
                </h1>
                <h1 className="text-xl max-lg:text-lg pt-0.5">
                  {userDetail?.email}
                </h1>
              </div>
              <br />
              <h1 className="text-2xl max-lg:text-xl text-light-2 dark:text-light-1">
                Rubros:
              </h1>
              <h2 className="text-xl max-lg:text-lg">{categories}</h2>

              <h1 className="text-2xl max-lg:text-xl text-light-2 dark:text-light-1 mt-6">
                Descripción:
              </h1>
              <h2 className="text-xl max-lg:text-lg">
                {userDetail?.description}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div>{navigate("/login")}</div>
      )}
    </div>
  );
};

export default FreelancerDetail;
