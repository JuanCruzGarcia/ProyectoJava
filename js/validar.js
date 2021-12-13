// Validacion Ingreso 

const form = document.getElementById("formulario")
const nombre = document.getElementById("formNombre")
const email = document.getElementById("formEmail")
const contrasena = document.getElementById("formContrasena")
const parrafo =  document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar =  false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <4){
        warnings += `El nombre es corto <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(contrasena.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        swal({
            title: "Ingreso Exitoso",
            icon: "success",
          });
    }
})

