export default function validation(input) {
  const error = {};
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/;
  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;

  if (!regexEmail.test(input.email)) {
    error.email = "Debe ingresar un Email valido!";
  }
  if (input.emailRep !== input.email) {
    error.emailRep = "Los emails no coinciden";
  }
  if (!regexPass.test(input.password)) {
    error.password =
      "La contraseña debe tener como mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número";
  }
  if (input.passwordRep !== input.password) {
    error.passwordRep = "Las contraseñas no coinciden";
  }
  if (!regexName.test(input.name)) {
    error.name = "El nombre no debe contener números";
  }
  if (!input.name) {
    error.name = "Debe ingresar un nombre";
  }
  if (!regexName.test(input.lastName)) {
    error.lastName = "El apellido no debe contener números";
  }
  if (!input.lastName) {
    error.lastName = "Debe ingresar un apellido";
  }
  if (!Date(input.birthDate)) {
    error.birthDate = "Debe ser una Fecha";
  }
  if (!input.birthDate) {
    error.birthDate = "Debe ingresar una Fecha de Nacimiento";
  }
  if (!input.location.country) {
    error.country = "Debe seleccionar un País";
  }
  if (!input.location.state) {
    error.state = "Debe seleccionar un Estado/Provincia";
  }
  if (!input.location.city) {
    error.city = "Debe seleccionar una Ciudad";
  }
  if (!input.description) {
    error.description = "Debe ingresar una descripción de su trabajo";
  }

  if (!input.category.length) {
    error.category = "Ingrese el rubro de la capacitación.";
  }

  if (!input.address) {
    error.address = "Debe ingresar su geolocalización";
  }
  return error;
}
