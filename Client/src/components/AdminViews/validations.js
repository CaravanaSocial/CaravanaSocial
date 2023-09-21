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
    if (!regexName.test(input.name)) {
        error.name = "El nombre no debe contener números"
    }
    if (!input.name) {
        error.name = "Debe ingresar un nombre"
    }

    return error;
}