//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function guardarDatos() {
    localStorage.nombre = document.getElementById("usuario").value;
}

function mostrarNombre(){
    document.getElementById("nombre").innerHTML = localStorage.nombre
}

document.addEventListener("DOMContentLoaded", function(e){
mostrarNombre();
    });