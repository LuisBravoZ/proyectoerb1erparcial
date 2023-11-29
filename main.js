//////////////////////////////////////////////////
// Navegación entre páginas

function irAPortada() {
    window.location.href = 'portada.html';
}

function irARegistro() {
    window.location.href = 'registro.html';
}

function cerrarSesion() {
    window.location.href = 'index.html';
}

const botonPortada = document.getElementById("regresar");
const botonRegistro = document.getElementById("registro");

if (botonPortada) {
    botonPortada.addEventListener("click", irAPortada);
}

if (botonRegistro) {
    botonRegistro.addEventListener("click", irARegistro);
}

/////////////////////////////////////////////////////////////
// Validación de Inicio de Sesión

function validarFormulario() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, ingresa el usuario y la contraseña.');
        return false;
    }

    if (username !== 'Tierra' || password !== 'tierra') {
        alert('Usuario o contraseña incorrectos.');
        return false;
    }

    // Redirigir al usuario a la página de inventario después de la validación
    window.location.href = 'inventario.html';
    return true;
}

//////////////////////////////////////////////////////////
                //CERRAR SESION///
function cerrarSesion() {
    // Redirigir al formulario de inicio de sesión
    window.location.href = 'index.html';
}
////////////

// ADD, DELETE, MODIFICAAR EQUIPOS //


var equipo =[];
var equipos = []; // Supongo que tienes una variable global para almacenar la lista de equipos

function agregarEquipoFromModal() {
    var serial = document.getElementById('modalSerial').value;
    var name = document.getElementById('modalName').value;
    var type = document.getElementById('modalType').value;
    var cantidad = parseInt(document.getElementById('modalCantidad').value);
    var facultad = document.getElementById('modalFacultad').value;
    

    // Validación básica de entrada
    if (serial.trim() === '' || name.trim() === '' || type.trim() === '' || isNaN(cantidad) || facultad.trim() === '') {
        alert('Por favor, ingresa todos los campos correctamente.');
        return;
    }
     // Validación de cantidad como número entero
     if (!/^[\d]+$/.test(cantidad) ) {
        alert('La cantidad debe ser un número entero.');
        return;
    }

    // Validación de número de serie como número
    if (!/^[\d]+$/.test(serial)) {
        alert('El número de serie debe ser un número.');
        return;
    }

    // Convertir la cantidad a un número entero
    cantidad = parseInt(cantidad, 10);

    // Buscar si el equipo ya existe en la lista
    var equipoExistente = equipos.find(function (equipo) {
        return equipo.serial === serial && equipo.name === name && equipo.type === type;
    });

    if (equipoExistente) {
        // Si el equipo ya existe, sumar la cantidad
        equipoExistente.cantidad += cantidad;
        // Actualizar la cantidad en la fila de la tabla
        actualizarCantidadEnTabla(equipoExistente);
    } else {
        // Si el equipo no existe, agregarlo a la lista
        equipos.push({
            serial: serial,
            name: name,
            type: type,
            cantidad: cantidad,
            facultad: facultad
        });

        // Agregar la nueva fila a la tabla
        agregarFilaATabla(serial, name, type, cantidad, facultad);
    }

    // Cerrar el modal después de agregar el equipo
    cerrarModal();

    // Limpiar los campos del formulario en el modal
    document.getElementById('modalSerial').value = '';
    document.getElementById('modalName').value = '';
    document.getElementById('modalType').value = '';
    document.getElementById('modalCantidad').value = '';
    document.getElementById('modalFacultad').value = '';
}

function actualizarCantidadEnTabla(equipo) {
    // Buscar la fila correspondiente en la tabla
    var rows = document.querySelectorAll('#inventory-list table tbody tr');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (
            row.cells[0].textContent === equipo.serial &&
            row.cells[1].textContent === equipo.name &&
            row.cells[2].textContent === equipo.type &&
            row.cells[4].textContent === equipo.facultad
        ) {
            // Actualizar la cantidad en la fila de la tabla
            row.cells[3].textContent = equipo.cantidad;
            break;
        }
    }
}

function agregarFilaATabla(serial, name, type, cantidad, facultad) {
    // Agregar la nueva fila a la tabla
    var table = document.querySelector('#inventory-list table tbody');
    var newRow = table.insertRow();
    newRow.insertCell(0).textContent = serial;
    newRow.insertCell(1).textContent = name;
    newRow.insertCell(2).textContent = type;
    newRow.insertCell(3).textContent = cantidad;
    newRow.insertCell(4).textContent = facultad;

    // Agregar botones de editar y eliminar
    var actionsCell = newRow.insertCell(5);
    var editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'boton-editar';
    editButton.onclick = function () {
        editarEquipo(this);
    };

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'boton-eliminar';
    deleteButton.onclick = function () {
        eliminarEquipo(this);
    };

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
}

function editarEquipo(button) {
    var row = button.closest('tr');

    // Crear campos de entrada editables
    var serialInput = document.createElement('input');
    serialInput.type = 'text';
    serialInput.value = row.cells[0].textContent;

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = row.cells[1].textContent;

    var typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.value = row.cells[2].textContent;

    var cantidadInput = document.createElement('input');
    cantidadInput.type = 'text';
    cantidadInput.value = row.cells[3].textContent;

    // Reemplazar texto con campos de entrada
    row.cells[0].innerHTML = '';
    row.cells[0].appendChild(serialInput);

    row.cells[1].innerHTML = '';
    row.cells[1].appendChild(nameInput);

    row.cells[2].innerHTML = '';
    row.cells[2].appendChild(typeInput);

    row.cells[3].innerHTML = '';
    row.cells[3].appendChild(cantidadInput);

    // Cambiar el botón de editar a guardar
    button.textContent = 'Guardar';
    button.onclick = function () {
        guardarEdicion(row, button);
    };
}

function guardarEdicion(row, button) {
    // Obtener los valores editados de los campos de entrada
    var serial = row.cells[0].querySelector('input').value;
    var name = row.cells[1].querySelector('input').value;
    var type = row.cells[2].querySelector('input').value;
    var cantidad = row.cells[3].querySelector('input').value;
    var facultad = row.cells[4].textContent; // Obtener la facultad de la fila

    // Validación básica de entrada
    if (serial.trim() === '' || name.trim() === '' || type.trim() === '' || cantidad.trim() === '') {
        alert('Por favor, ingresa todos los campos.');
        return;
    }

    // Actualizar los valores de la fila con los valores editados
    row.cells[0].textContent = serial;
    row.cells[1].textContent = name;
    row.cells[2].textContent = type;
    row.cells[3].textContent = cantidad;
    row.cells[4].textContent = facultad; // Mantener la facultad

    // Cambiar el botón de guardar a editar
    button.textContent = 'Editar';
    button.onclick = function () {
        editarEquipo(button);
    };
}

function eliminarEquipo(button) {
    var row = button.closest('tr');
    row.parentNode.removeChild(row);
}

/*Modal*/
function abrirModal() {
    var modal = document.getElementById('addEquipmentModal');
    modal.style.display = 'block';
}

function cerrarModal() {
    var modal = document.getElementById('addEquipmentModal');
    modal.style.display = 'none';
}




function filtrarPorFacultad() {
    var facultadSeleccionada = document.getElementById('facultadFilter').value;

    // Obtén todas las filas de la tabla
    var filas = document.querySelectorAll('#inventory-list table tbody tr');

    // Itera a través de las filas y muestra/oculta según la facultad seleccionada
    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var facultad = fila.cells[4].textContent; // Suponiendo que la facultad está en la quinta celda

        if (facultadSeleccionada === 'todas' || facultad === facultadSeleccionada) {
            // Mostrar la fila si coincide con la facultad seleccionada o si se selecciona "Todas"
            fila.style.display = 'table-row';
        } else {
            // Ocultar la fila si no coincide con la facultad seleccionada
            fila.style.display = 'none';
        }
    }
}
