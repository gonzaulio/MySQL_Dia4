// DATA

class alumnos {
    constructor(nombre, apellidos, modalidad, anoingreso){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.modalidad = modalidad;
        this.anoingreso = anoingreso;
    }
}


function getAlumno() {
    let id = document.getElementById("id").value;
    
    let url;
    if (id == "") {
        url = `http://localhost:3000/alumnos`
    } else {
        url = `http://localhost:3000/alumnos?id=${id}`
    }    
    let param = {
        headers: {"content-type": "aplication/json; chartset = UTF-8"},
        method: "GET"
    }

    fetch(url, param)
    .then(function (data) {
        return data.json()
    })
    .then(function (result) {
        console.log(result)
        let indiceconocido;
        columnaderecha.innerHTML = "";

        if (id) {

        const divnuevo = document.createElement("div");
        const divnuevocontenido = `
        
                  <button type="button" class="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}" id="botondemostrar">${result[0].nombre} ${result[0].apellidos} (ID: ${result[0].idalumnos})</button>
                                  <div class="collapse" id="collapse${id}">
                                      <div class="card card-body">
                                        
                                            <div id="cartademostrar">
                                                Nombre: ${result[0].nombre} <br>
                                                Apellido: ${result[0].apellidos} <br>
                                                Modalidad: ${result[0].id_modalidad} <br>
                                                Año de Ingreso: ${result[0].year_ingreso}

                                            </div>
                          
                                            <div id="contenedorbotones">
                                            <div><button type="button" class="btn btn-primary" style="margin: 5px; onclick="onclick="mostrarAlumno(${id})">Editar</button><button type="button" class="btn btn-primary" style="margin: 5px;" onclick="borrarAlumno(${id})">Eliminar</button></div>
                                            </div>
                  
                                      </div>
                                  </div>
        `

        divnuevo.innerHTML = divnuevocontenido;
        columnaderecha.appendChild(divnuevo);

        }
        else {

            
            for (let index = 0; index < result.length; index++) {
                
                const divnuevo = document.createElement("div");
                const divnuevocontenido = `
                
                          <button type="button" class="list-group-item list-group-item-action" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}" aria-expanded="false" aria-controls="collapse${index + 1}" id="botondemostrar">${result[index].nombre} ${result[index].apellidos} (ID: ${result[index].idalumnos})</button>
                                          <div class="collapse" id="collapse${index + 1}">
                                              <div class="card card-body">
                                                
                                                    <div id="cartademostrar">
                                                        Nombre: ${result[index].nombre} <br>
                                                        Apellido: ${result[index].apellidos} <br>
                                                        Modalidad: ${result[index].id_modalidad} <br>
                                                        Año de Ingreso: ${result[index].year_ingreso}
        
                                                    </div>
                                  
                                                    <div id="contenedorbotones">
                                                    <div><button type="button" class="btn btn-primary" style="margin: 5px;" onclick="mostrarAlumno(${result[index].idalumnos})">Editar</button><button type="button" class="btn btn-primary" style="margin: 5px;" onclick="borrarAlumno(${result[index].idalumnos})">Eliminar</button></div>
                                                    </div>
                          
                                              </div>
                                          </div>
                `
        
                divnuevo.innerHTML = divnuevocontenido;
                columnaderecha.appendChild(divnuevo);
            

                indiceconocido = result[index].idalumnos;

            }

        }

    })
    .catch(function (error) {
        console.log(error);
    })
}




function agregarAlumno() {
    

    const url = `http://localhost:3000/alumnos`;

    let alumno = new alumnos(
        document.getElementById("nombre").value,
        document.getElementById("apellidos").value,
        document.getElementById("modalidad").value,
        document.getElementById("anoingreso").value,
    )

    let param = {
        headers: {"content-type": "application/json; chartset = UTF-8"},
        body: JSON.stringify(alumno),
        method: "POST"
    }

    fetch(url,param)
    .then(function (data) {
        return data.json()
    })
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.log(error);
        
    })

    let formulario = document.getElementById("myForm")
    formulario.reset()
    window.scrollTo(0,0)
    getAlumno()
    alert("Alumno Agregado")

}


function mostrarAlumno(e) {
    editor = e;
    var id = e
    let url = `http://localhost:3000/alumnos/?id=${id}`
    let param = {
        headers: {"content-type": "aplication/json; chartset = UTF-8"},
        method: "GET"
    }
    
    fetch(url, param)
    .then(function (data) {
        return data.json()
    })
    .then(function (result) {
        console.log(result);
        window.scrollTo(0,0);

        document.getElementById("nombre").value = result[0].nombre,
        document.getElementById("apellidos").value = result[0].apellidos,
        document.getElementById("modalidad").value = result[0].id_modalidad,
        document.getElementById("anoingreso").value = result[0].year_ingreso,
        

    activarbotoneditar();

    })


};

// --- FUNCIONES PARA ACTIVAR Y DESACTIVAR BOTONES

function activarbotoneditar() {
    let buttonput = document.querySelector("#buttonputprofesional");
    let buttonpost = document.querySelector("#buttonpostProfesional");
    buttonput.disabled = false;
    buttonpost.disabled = true;
}

function activarbotonguardar() {
    let buttonput = document.querySelector("#buttonputprofesional");
    let buttonpost = document.querySelector("#buttonpostProfesional");
    buttonput.disabled = true;
    buttonpost.disabled = false;
}



function editarAlumno() {

    let ideditor =  editor;

    const url = `http://localhost:3000/alumnos?id=${ideditor}`;

    let alumno = new alumnos(
        document.getElementById("nombre").value,
        document.getElementById("apellidos").value,
        document.getElementById("modalidad").value,
        document.getElementById("anoingreso").value,
    )

    let param = {
        headers: {"content-type": "application/json; chartset = UTF-8"},
        body: JSON.stringify(alumno),
        method: "PUT"
    }

    fetch(url,param)
    .then(function (data) {
        return data.json()
    })
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.log(error);
        
    })

    let formulario = document.getElementById("myForm")
    formulario.reset()
    window.scrollTo(0,0)
    alert("Alumno actualizado")
    getAlumno()
    activarbotonguardar()
    
}

function borrarAlumno(e) {
    
    let ideditor =  e;

    const url = `http://localhost:3000/alumnos?id=${ideditor}`;
    let param = {
        headers: {"content-type": "application/json; chartset = UTF-8"},
        // body: JSON.stringify(alumno),
        method: "DELETE"
    }
    fetch(url,param)
    .then(function (data) {
        return data.json()
    })
    .then(function (result) {
        console.log(result);
        window.scrollTo(0,0)
        alert("Alumno eliminado")
        getAlumno()
    })
    .catch(function (error) {
        console.log(error);
        
    })

}