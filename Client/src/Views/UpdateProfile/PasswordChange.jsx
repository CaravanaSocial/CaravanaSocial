import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Actions/Actions";
import { useNavigate, useParams } from "react-router-dom";

const PasswordChange = () => {
  const { id } = useParams();

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
  const navigate = useNavigate()

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(changePassword(id, passwordChange, typeOfCount));
    navigate("/home")
  };

  return (
    <div>
      <h1>Cambio de Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label>Password/contraseña antigua: </label>
        <input
          type="passwprd"
          name="oldPassword"
          value={passwordChange.oldPassword}
          onChange={handleChange}
        />

        <br />
        <p>-------------------------------------------</p>
        <label>Password/contraseña nueva</label>
        <input
          type="password"
          name="newPassword"
          value={passwordChange.newPassword}
          onChange={handleChange}
        />
        {passwordValidation.error && (
          <div style={{ color: "red" }}>{passwordValidation.error}</div>
        )}
        <button disabled={!passwordValidation.valid}>Enviar</button>
      </form>
    </div>
  );
};

export default PasswordChange;



