document.getElementById("formulario").addEventListener("submit",function(event){ //Detecta y controla cuando el usuario intenta enviar el formulario
    let errores = [] //Cuenta los errores
    let nombre = document.getElementById("nombre").value; //Lee y guarda el texto escrito
    let apellido = document.getElementById("apellido").value;
    let cargo = document.getElementById("cargo").value;
    let email = document.getElementById("email").value;

    if (nombre === "") {
        errores.push("El campo nombre es obligatorio.");
    }

    if (apellido === "") {
        errores.push("El campo apellido es obligatorio.");
    }

    if (cargo === "") {
        errores.push("El campo cargo es obligatorio.");
    }

    if (email === "") {
        errores.push("El campo email es obligatorio.");
    }

    // Validación extra que contenga @ y .
    else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        errores.push("El correo debe contener @ y un punto (ejemplo@correo.com).");
    }


    if (errores.length > 0) {
        event.preventDefault(); // Evita que se envíe el formulario
        document.getElementById("errores").innerHTML = errores.join("<br>");
    }

});



