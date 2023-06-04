export default function validarCrearCuenta(valores){
    let errores = {};

    //validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = 'El nombre es obligatorio';   
// no tiene que tener numeros
    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
        errores.nombre = 'El nombre solo puede contener letras y espacios';
    }
  
  

    //validar el apellido del usuario
    if(!valores.apellido){
        errores.apellido = 'El apellido es obligatorio';
    }

    //validar el email del usuario
    if(!valores.email){
        errores.email = 'El email es obligatorio';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = 'El email no es valido';
    }

    //validar el password del usuario
    if(!valores.password){
        errores.password = 'El password es obligatorio';
    }else if(valores.password.length < 6){
        errores.password = 'El password debe ser de al menos 6 caracteres';
    }

    //validar el password del usuario
    if(!valores.confirmar){
        errores.confirmar = 'El password es obligatorio';
    }else if(valores.password !== valores.confirmar){
        errores.confirmar = 'Los passwords no son iguales';
    }

    return errores;
}