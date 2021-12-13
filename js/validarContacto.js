// Validacion Form Contacto

const form = document.getElementById("formularioContacto")
const nombre = document.getElementById("NombreContacto")
const email = document.getElementById("EmailContacto")
const texto = document.getElementById("textConsulta")
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
    if(texto.value.length <= 15){
        warnings += `La consulta es menor a 15 caracteres <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        swal({
            title: "Consulta Enviada",
            icon: "success",
          });
    }
})