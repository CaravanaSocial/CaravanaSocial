export default function Validation (input){
    const error = {};
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;

    if (input.title && !regexName.test(input.title)){
        error.title = "El nombre no debe contener números"
    } else if (!input.title) {
        error.title = "Debe ingresar un nombre"
    }

    if (!input.description) {
        error.description = "Debe ingresar una descripción de su trabajo"
    }

    return error;
}