export default function validation(input) {
    const error = {}
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    if (!regexEmail.test(input.email)) {
        error.email = "Debe ingresar un Email valido!"
    }
    return error;
}