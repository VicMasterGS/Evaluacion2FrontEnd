// Arreglo para almacenar colaboradores
let colaboradores = [];

// Función para renderizar la tabla
function renderizarTabla(arreglo) {
    let tbody = document.getElementById("tbody-colaboradores");
    
    if (!tbody) {
        console.error("No se encontró el tbody");
        return;
    }
    
    tbody.innerHTML = ""; // Limpiar la tabla

    for (let i = 0; i < arreglo.length; i++) {
        let colab = arreglo[i];
        
        let fila = "<tr>";
        fila += "<td>" + colab.nombre + "</td>";
        fila += "<td>" + colab.apellido + "</td>";
        fila += "<td>" + colab.cargo + "</td>";
        fila += "<td>" + colab.email + "</td>";
        fila += "</tr>";

        tbody.innerHTML += fila;
    }
}

// Función reutilizable para filtrar colaboradores
function filtrarColaboradores(texto) {
    // Convertir a minúsculas para buscar sin importar mayúsculas/minúsculas
    let textoLower = texto.toLowerCase();
    
    // Usar filter para crear un nuevo arreglo con los elementos que coincidan
    let filtrados = colaboradores.filter(function(colab) {
        // Buscar en nombre O en cargo
        let nombreMatch = colab.nombre.toLowerCase().includes(textoLower);
        let cargoMatch = colab.cargo.toLowerCase().includes(textoLower);
        
        return nombreMatch || cargoMatch;
    });
    
    // Renderizar la tabla con los colaboradores filtrados
    renderizarTabla(filtrados);
}

// Evento submit del formulario
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let errores = [];
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let cargo = document.getElementById("cargo").value;
    let email = document.getElementById("email").value;

    // Validación de campos vacíos
    if (nombre === "") {
        errores.push("El campo nombre es obligatorio.");
    } else if (nombre.length < 2) {
        errores.push("El nombre debe tener al menos 2 letras.");
    }

    if (apellido === "") {
        errores.push("El campo apellido es obligatorio.");
    } else if (apellido.length < 2) {
        errores.push("El apellido debe tener al menos 2 letras.");
    }

    if (cargo === "") {
        errores.push("El campo cargo es obligatorio.");
    } else if (cargo.length < 2) {
        errores.push("El cargo debe tener al menos 2 letras.");
    }

    if (email === "") {
        errores.push("El campo email es obligatorio.");
    } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        errores.push("El correo debe contener @ y un punto (ejemplo@correo.com).");
    }

    // Si hay errores, mostrarlos
    if (errores.length > 0) {
        document.getElementById("errores").innerHTML = errores.join("<br>");
    } else {
        // No hay errores: crear objeto colaborador y agregarlo
        let nuevoColaborador = {
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            email: email
        };

        colaboradores.push(nuevoColaborador);

        // Renderizar la tabla con todos los colaboradores
        renderizarTabla(colaboradores);

        // Limpiar el formulario
        document.getElementById("formulario").reset();
        
        // Limpiar mensajes de error
        document.getElementById("errores").innerHTML = "";
        
        alert("Colaborador registrado exitosamente!");
    }
});

// Event listener del campo de búsqueda
document.getElementById("buscar").addEventListener("input", function(event) {
    let texto = event.target.value;
    
    if (texto === "") {
        // Si está vacío, mostrar todos los colaboradores
        renderizarTabla(colaboradores);
    } else {
        // Si tiene texto, filtrar
        filtrarColaboradores(texto);
    }
});