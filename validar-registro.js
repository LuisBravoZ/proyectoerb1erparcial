
function validadregistro()
{
    return true;
}





function iratras() {
    window.location.href = 'index.html';
    return false;

}

/*
const botonatras = document.getElementById("atras");
if(botonatras){
    botonatras = document.addEventListener("click", iratras);

}*/

//////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////


const mensaje1 = document.getElementById('mensaje1');
const mensaje2 = document.getElementById('mensaje2');
const mensaje3 = document.getElementById('mensaje3');
const mensaje4 = document.getElementById('mensaje4');
const mensaje5 = document.getElementById('mensaje5');
const mensaje6 = document.getElementById('mensaje6');
const mensaje7 = document.getElementById('mensaje7');
const mensaje8 = document.getElementById('mensaje8');

  
const usuario = document.getElementById("usuario").value;
const nombre = document.getElementById("nombre").value;
const apellido = document.getElementById("apellido").value;
const telefono = document.getElementById("telefono").value;
const email= document.getElementById("email").value;
const contraseña = document.getElementById("contraseña").value;
const contraseña2 = document.getElementById("contraseña2").value;

document.getElementById("formularioCliente").addEventListener("submit", function (event) {
    // Previene el envío del formulario si la validación falla
    if (!validadregistro()) {
        event.preventDefault();
    }
});

function validadregistro() {
    const mensaje1 = document.getElementById('mensaje1');
    const mensaje2 = document.getElementById('mensaje2');
    const mensaje3 = document.getElementById('mensaje3');
    const mensaje4 = document.getElementById('mensaje4');
    const mensaje5 = document.getElementById('mensaje5');
    const mensaje6 = document.getElementById('mensaje6');
    const mensaje7 = document.getElementById('mensaje7');
    const mensaje8 = document.getElementById('mensaje8');


    const usuario = document.getElementById("usuario").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email= document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;
    const contraseña2 = document.getElementById("contraseña2").value;

    const ExpReg_Usuario = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    const ExpReg_Nombre = /^[a-zA-ZÀ-ÿ\s]{4,40}$/; // Letras y espacios, pueden llevar acentos.
    const ExpReg_Apellido = /^[a-zA-ZÀ-ÿ\s]{4,40}$/; // Letras y espacios, pueden llevar acentos.
    const ExpReg_Correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const ExpReg_Telefono = /^\d{10}$/; // 10 numeros.
const form = document.getElementById("formularioCliente");
    
 if(!ExpReg_Nombre.test(nombre)){
    document.getElementById("nombre").focus();
    mensaje1.innerHTML = "ingrese un nombre valido";
    return false;
}
else if(!ExpReg_Apellido.test(apellido)){     
    document.getElementById("apellido").focus();   
    mensaje2.innerHTML = "ingrese un apellido valido";
    return false;
}
else if(!ExpReg_Usuario.test(usuario)){
        document.getElementById("usuario").focus();
        mensaje3.innerHTML = "El usuario tiene que tener mas de 4 digitos y puede contener numero y letras";
        return false;
    }
else if (!ExpReg_Telefono.test(telefono)){
    document.getElementById("telefono").focus();
    mensaje7.innerHTML = "El nomero de celular es incorercto";
    return false;
}
else if(!ExpReg_Correo.test(email)){
    document.getElementById("email").focus();
    mensaje4.innerHTML = "Correo incorrecto, ingrese un correo valido";
    return false;
}
else if (contraseña !== contraseña2){
    mensaje6.innerHTML = "Las contraseñas no coinciden"
    return false;
}else{
    mensaje1.innerHTML= "";
    mensaje2.innerHTML= "";
    mensaje3.innerHTML= "";
    mensaje4.innerHTML= "";
    mensaje5.innerHTML= "";
    mensaje6.innerHTML= "";
    mensaje7.innerHTML= "";


    mensaje8.innerHTML= "FORMULARIO ENVIADO";
    //FUNCION PARA QUE DESAPAREZCA DESPUES DE UN TIEMPO 
    //QUE SE ENVIE EL FORMULARIO CORRECTAMENTE
    setTimeout(function() {
        mensaje8.innerHTML = "";
    }, 3000);
   window.location.href ="inventario.html";
   
} 
    
}

