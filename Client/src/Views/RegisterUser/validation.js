export default function validation(input) {
    const error = {}
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;


    if (!regexEmail.test(input.email)) {
        error.email = "Debe ingresar un Email valido!"
    }
    if (!regexPass.test(input.password)) {
        error.password = "La contraseña debe tener como mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número"
    }
    if (!regexName.test(input.nombre)) {
        error.nombre = "El nombre no debe contener números"
    }
    if (!input.nombre) {
        error.nombre = "Debe ingresar un nombre"
    }
    if (!regexName.test(input.apellido)) {
        error.apellido = "El apellido no debe contener números"
    }
    if (!input.apellido) {
        error.apellido = "Debe ingresar un apellido"
    }
    if (!Number(input.edad)) {
        error.edad = "La edad debe ser un número"
    }
    if (!input.edad) {
        error.edad = "Debe ingresar una edad"
    }
    if (!input.pais) {
        error.pais = "Debe ingresar su país de residencia"
    }
    if (!input.CUD) {
        error.CUD = "Debe ingresar su código CUD"
    }
    if (!input.trabajo) {
        error.trabajo = "Debe ingresar una descripción de su trabajo"
    }
    if (!input.geolocalizacion) {
        error.geolocalizacion = "Debe ingresar su geolocalización"
    }
    return error;
}