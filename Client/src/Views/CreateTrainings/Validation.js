export default function Validation (input){
    const error = {};
    const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÄËÏÖÜäëïöüÀÈÌÒÙàèìòù\s]+$/;
    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    if (input.name && !regexName.test(input.name)){
        error.name = "El nombre no debe contener números."
    } else if (!input.name) {
        error.name = "Debe ingresar el nombre de la capacitación."
    }

    if (!input.description) {
        error.description = "Debe ingresar una descripción de la capacitación."
    }

    if(!input.category.length){
        error.category = "Debe ingresar al menos un rubro."
    }
    
    return error;
}