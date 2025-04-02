let data = { 
    datosPersonales: {}, 
    familiares: [], 
    condiciones: [], 
    internamientos: [] 
};

// Función para avanzar a la siguiente página y guardar datos personales
function nextPage(page) {
    if (page === 2) {
        data.datosPersonales = {
            nombre: document.getElementById('nombre').value.trim(),
            edad: document.getElementById('edad').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            nacionalidad: document.getElementById('nacionalidad').value.trim()
        };
    }

    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('page' + page).classList.add('active');

    if (page === 5) {
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
}

// Función para agregar un familiar
function addFamiliar() {
    let nombre = document.getElementById('familiar_nombre').value.trim();
    let parentesco = document.getElementById('parentesco').value.trim();
    let edad = document.getElementById('familiar_edad').value.trim();

    if (nombre && parentesco && edad) {
        let familiar = { nombre, parentesco, edad };
        data.familiares.push(familiar);
        document.getElementById('lista_familiares').innerHTML += `<li>${nombre} - ${parentesco} - ${edad} años</li>`;
    } else {
        alert("Por favor, completa todos los campos del familiar.");
    }
}

// Función para agregar una condición de salud
function addEnfermedad() {
    let enfermedad = document.getElementById('enfermedad').value.trim();
    let tiempo = document.getElementById('tiempo').value.trim();

    if (enfermedad && tiempo) {
        let condicion = { enfermedad, tiempo };
        data.condiciones.push(condicion);
        document.getElementById('lista_enfermedades').innerHTML += `<li>${enfermedad} - ${tiempo}</li>`;
    } else {
        alert("Por favor, completa todos los campos de la condición de salud.");
    }
}

// Función para agregar un internamiento
function addInternamiento() {
    let fecha = document.getElementById('fecha').value;
    let centro = document.getElementById('centro').value.trim();
    let diagnostico = document.getElementById('diagnostico').value.trim();

    if (fecha && centro && diagnostico) {
        let internamiento = { fecha, centro, diagnostico };
        data.internamientos.push(internamiento);
        document.getElementById('lista_internamientos').innerHTML += `<li>${fecha} - ${centro} - ${diagnostico}</li>`;
    } else {
        alert("Por favor, completa todos los campos del internamiento.");
    }
}

// Función para guardar los datos en la consola
function saveData() {
    alert('Datos guardados en la consola.');
    console.log(data);
    mostrarTabla();
}

// Función para regresar a la página anterior
function prevPage(page) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('page' + page).classList.add('active');
}

// Función para mostrar los datos en la tabla
function mostrarTabla() {
    let contenido = document.getElementById('tablaContenido');
    contenido.innerHTML = ''; // Limpiar la tabla antes de agregar datos

    let dp = data.datosPersonales;
    let maxRows = Math.max(1, data.familiares.length, data.condiciones.length, data.internamientos.length);

    for (let i = 0; i < maxRows; i++) {
        let familiar = data.familiares[i] || { nombre: "", parentesco: "", edad: "" };
        let condicion = data.condiciones[i] || { enfermedad: "", tiempo: "" };
        let internamiento = data.internamientos[i] || { fecha: "", centro: "", diagnostico: "" };

        contenido.innerHTML += `
            <tr>
                <td>${i === 0 ? dp.nombre : ""}</td>
                <td>${i === 0 ? dp.edad : ""}</td>
                <td>${i === 0 ? dp.telefono : ""}</td>
                <td>${i === 0 ? dp.nacionalidad : ""}</td>
                <td>${familiar.nombre}</td>
                <td>${familiar.parentesco}</td>
                <td>${familiar.edad}</td>
                <td>${condicion.enfermedad}</td>
                <td>${condicion.tiempo}</td>
                <td>${internamiento.fecha}</td>
                <td>${internamiento.centro}</td>
                <td>${internamiento.diagnostico}</td>
            </tr>
        `;
    }

    document.getElementById("tablaDatos").style.display = 'table';
}

// Función para alternar la visibilidad de la tabla
function toggleTabla() {
    let tabla = document.getElementById('tablaDatos');
    let boton = document.getElementById('botonToggleTabla');

    if (tabla.style.display === 'none' || tabla.style.display === '') {
        tabla.style.display = 'table';
        boton.textContent = "Ocultar Tabla";
    } else {
        tabla.style.display = 'none';
        boton.textContent = "Mostrar Tabla";
    }
}

// Función para mostrar una vista previa de los datos antes de guardarlos
function mostrarVistaPrevia() {
    let preview = document.getElementById('vistaPrevia');
    preview.innerHTML = ""; // Limpiar la vista previa

    // Mostrar datos personales
    let dp = data.datosPersonales;
    preview.innerHTML += `<p><strong>Nombre:</strong> ${dp.nombre} ${dp.apellido} - <strong>Edad:</strong> ${dp.edad} - <strong>Teléfono:</strong> ${dp.telefono} - <strong>Nacionalidad:</strong> ${dp.nacionalidad}</p>`;

    // Mostrar los datos de familiares
    data.familiares.forEach(familiar => {
        preview.innerHTML += `<p><strong>Familiar:</strong> ${familiar.nombre} - ${familiar.parentesco} - ${familiar.edad} años</p>`;
    });

    // Mostrar las condiciones
    data.condiciones.forEach(condicion => {
        preview.innerHTML += `<p><strong>Condición:</strong> ${condicion.enfermedad} - ${condicion.tiempo}</p>`;
    });

    // Mostrar los internamientos
    data.internamientos.forEach(internamiento => {
        preview.innerHTML += `<p><strong>Internamiento:</strong> ${internamiento.fecha} - ${internamiento.centro} - ${internamiento.diagnostico}</p>`;
    });

    // Mostrar la sección de vista previa
    document.getElementById('seccionVistaPrevia').style.display = 'block';
}

function toggleTabla() {
    let tabla = document.getElementById('tablaDatos');
    let boton = document.getElementById('botonToggleTabla');

    if (tabla.style.display === 'none' || tabla.style.display === '') {
        tabla.style.display = 'block';
        boton.textContent = "Ocultar Tabla";
    } else {
        tabla.style.display = 'none';
        boton.textContent = "Mostrar Tabla";
    }
}
function limpiarFormulario() {
    // Reiniciar datos almacenados en el objeto 'data'
    data = {
        datosPersonales: {}, 
        familiares: [], 
        condiciones: [], 
        internamientos: []
    };

    // Limpiar los campos de entrada
    document.querySelectorAll('input').forEach(input => input.value = '');

    // Limpiar las listas de familiares, enfermedades e internamientos
    document.getElementById('lista_familiares').innerHTML = '';
    document.getElementById('lista_enfermedades').innerHTML = '';
    document.getElementById('lista_internamientos').innerHTML = '';

    // Ocultar la tabla si está visible
    document.getElementById('tablaDatos').style.display = 'none';

    // Volver a la primera página del formulario
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
}
