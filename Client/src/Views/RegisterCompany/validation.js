export default function validation(input){
   let error ={}
   const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/;
   const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    if (!regexEmail.test(input.email)){
        error.email = "Debe ingresar un Email valido!"   
    }
    
    if(input.emailRep !== input.email){
        error.emailRep = "Los emails no coinciden."
    }

    if(!regexPass.test(input.password)){
       error.password = "La contraseña debe tener como mínimo 8 caracteres, una letra mayúscula, una letra minúscula y un número."
    }

    if(input.passwordRep !== input.password){
        error.passwordRep = "Las contraseñas no coinciden."
    }

    if(!input.nameCompany){
        error.nameCompany = "Ingrese el nombre de la empresa."
    }

    if(input.name.length > 20 || input.name.length < 2){
        error.name = "El nombre debe contener entre 3 y 20 caracteres."
    }

    if(!input.description){
        error.description = "Queremos saber de qué trata la empresa."
    }

    if(!input.name){
        error.name ="Introduzca su nombre."
    }

    if(!input.lastName){
        error.lastName ="Introduzca su apellido."
    }

    if(!input.position){
        error.position ="Introduzca su cargo."
    }

    if(!input.phone){
        error.phone ="Necesitamos un telefono para estar en contacto."
    }

    if(!input.category.length){
        error.category = "Ingrese el rubro en el que está especializado."
    }

    if(!input.location.country || !input.location.state ){
        error.location = "Rellene los tres campos"
    }

    return error;
}