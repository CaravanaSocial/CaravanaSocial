export default function Validation (input){
    const error = {};
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;
    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    if (input.name && !regexName.test(input.name)){
        error.name = "El nombre no debe contener números"
    } else if (!input.name) {
        error.name = "Debe ingresar un nombre"
    }

    if (!input.description) {
        error.description = "Debe ingresar una descripción de su trabajo"
    }

    /* if(input.video && !regexUrl.test(input.video)) {
        error.video = "Debe ser una url: (http/https/ftp)"
    }
 */
    return error;
}