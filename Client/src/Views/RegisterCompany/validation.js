export default function validation(input){
   let error ={}
   const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


   if (!regexEmail.test(input.email)){
    error.email = "Debe ingresar un Email valido!"   
    }

    if(!regexPass.test(input.contraseña)){
     error.contraseña = "La contraseña debe tener como mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número."
    }

    if(input.contraseñaRepetida !== input.contraseña){
        error.contraseñaRepetida = "Las contraseñas no coinciden."
    }

    if(!input.nombre){
        error.nombre = "Ingrese el nombre de la empresa."
    }

    if(input.nombre.length > 20 || input.nombre.length < 5){
        error.nombre = "El nombre debe contener entre 5 y 20 caracteres."
    }

    if(!input.descripcion){
        error.descripcion = "Queremos saber de qué trata la empresa."
    }

    // if(input.descripcion.length < 5 ){
    //     error.descripcion = "Cuentanos más!"
    // }

    return error;
}