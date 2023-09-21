import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Actions/Actions";
import { useNavigate, useParams } from "react-router-dom";

const PasswordChange = () => {
  const id = localStorage.accId;

  console.log(id);

  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    valid: false,
    error: "",
  });

  const typeOfCount = localStorage.type;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPasswordChange({
      ...passwordChange,
      [name]: value,
    });

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const isValid = regex.test(value);

    if (isValid) {
      setPasswordValidation({
        valid: true,
        error: "",
      });
    } else {
      setPasswordValidation({
        valid: false,
        error:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
      });
    }
  };
  const goBack =()=>{
    navigate(-1)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changePassword(id, passwordChange, typeOfCount));
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="justify-center border-spacing-96 border-2 border-light-1 dark:border-light-1 rounded-3xl p-4 my-4">
        <h1 className="text-2xl font-nunito font-bold dark:font-medium text-[30px] text-center border-b-2 border-light-1 dark:border-light-1 dark:text-gray-300"
        >Cambio de contraseña</h1>

        <form className="text-center mt-5" onSubmit={handleSubmit}>
          <h2 className="text-lg font-nunito font-bold dark:text-gray-300"
          >Tu contraseña actual</h2>

          <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            type="password"
            name="oldPassword"
            value={passwordChange.oldPassword}
            onChange={handleChange}
            placeholder="Actual..."
          />

          <h2 className="text-lg font-nunito font-bold dark:text-gray-300"
          >Tu nueva contraseña</h2>
          <input className="h-8 rounded-3xl px-2 my-2 bg-gray-300 dark:bg-gray-800 text-zinc-800 dark:text-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-light-1"
            type="password"
            name="newPassword"
            value={passwordChange.newPassword}
            onChange={handleChange}
            placeholder="Nueva..."
          />
          {passwordValidation.error && (
            <p  className="text-red-600">{passwordValidation.error}</p>
          )}
          <br />
          <button className="bg-gray-300 font-nunito font-bold rounded-3xl p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-light-2 hover:scale-95 mx-2" onClick={goBack}>Cancelar</button>
          <button className="mx-2 cursor-pointer bg-light-1 font-nunito font-bold rounded-3xl p-2 mb-2 border-2 border-transparent dark:text-zinc-900 hover:text-white hover:scale-95 dark:hover:text-white"
            disabled={!passwordValidation.valid}
          >Enviar</button>
          
        </form>
      </div>
      
    </div>
  );
};

export default PasswordChange;
