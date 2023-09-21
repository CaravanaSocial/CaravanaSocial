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
  const speech = useSelector((state) => state.enableSpeech);
  const [synth, setSynth] = useState(null);
  const { id, code } = useParams();
  const { userDetail, companyDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(detailCompany(id));
    setSynth(window.speechSynthesis);
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
          if (!postError) {
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

  const speakText = (text) => {
    if (speech === true && synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = 1;
      utterance.lang = "es-ES";
      synth.speak(utterance);
    }
  };
  const cancelVoice = () => {
    if (synth) {
      synth.cancel();
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-center text-center">
        <div className="mt-4">
          <h1
            className="text-4xl text-[50px] border-b-2 border-light-1 dark:border-light-1 dark:text-gray-300"
            onClick={() => speakText("Verificación")}
            onMouseLeave={() => {
              cancelVoice;
            }}
          >
            Verificación
          </h1>
          <p
            className="text-xl text-[50px] text-center dark:text-gray-300"
            onClick={() =>
              speakText(
                "Pulsa el botón para verificar tu cuenta y a continuacion podras iniciar sesión"
              )
            }
            onMouseLeave={() => {
              cancelVoice;
            }}
          >
            Pulsa el botón para verificar tu cuenta y a continuacion podras
            iniciar sesión
          </p>
          <br />
          <button
            className="bg-light-1 p-2 rounded-3xl text-xl dark:text-black"
            onClick={handleSubmit}
          >
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
