import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  setNewErrors,
  getUserById,
  detailCompany,
  editCompany,
} from "../../Redux/Actions/Actions";
import Swal from "sweetalert2";

const Verification = () => {
  const { id, code } = useParams();
  const { userDetail, companyDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(detailCompany(id));
    console.log(userDetail);
    console.log(companyDetail);
  }, []);

  const [inputCode, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const handleSubmit = () => {
    if (userDetail?.id === id) {
      if (userDetail.verificationCode === Number(code)) {
        dispatch(
          editUser(id, {
            verified: true,
          })
        ).then((postError) => {
          if ("name" in postError) {
            Swal.fire({
              title: "El mail se ha verificado correctamente.",
              text: `Por favor inicia sesión para continuar`,
              icon: "success",
              customClass: {
                popup: "",
              },
            });
            navigate("/login");
            dispatch(clearErrors());
          } else {
            dispatch(
              setNewErrors({
                type: "EMAIL_VERIFICATION",
                error: postError?.response?.data,
              })
            );
          }
        });
      }
      setError("El código proporcionado es incorrecto");
    } else if (companyDetail?.id === id) {
      if (companyDetail.verificationCode === Number(code)) {
        dispatch(
          editCompany(id, {
            verified: true,
          })
        ).then((postError) => {
          if (!postError) {
            Swal.fire({
              title: "El mail se ha verificado correctamente",
              text: `Por favor inicia sesión para continuar`,
              icon: "success",
              customClass: {
                popup: "",
              },
            });
            navigate("/login");
            dispatch(clearErrors());
          } else {
            dispatch(
              setNewErrors({
                type: "EMAIL_VERIFICATION",
                error: postError?.response?.data,
              })
            );
          }
        });
      }
      setError("El código proporcionado es incorrecto");
    }
  };
  return (
    <div>
      {/*  <input onChange={handleChange} type="number" /> */}
      <button onClick={handleSubmit}>Verificar</button>
      {/* <p style={{ visibility: error !== "" ? "visible" : "hidden"}}>{error}</p> */}
    </div>
  );
};

export default Verification;
