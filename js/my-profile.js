//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function permitirModificar() {
    var elem = document.getElementsByClassName("toggleEdit");
    if (esModificable) {
            for (let i = 0; i < elem.length; i++) {
                elem[i].classList.add("border-0");
                elem[i].toggleAttribute("disabled");
            }
          
            cambiarBoton();
            salvarDatos();
            esModificable = false;
            location.reload();
        }
    else{
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove("border-0");
            elem[i].toggleAttribute("disabled");
        }
        cambiarBoton();
        esModificable = true;
    }
};

function salvarDatos() {
   
    var nombreCompleto = document.getElementById("nombreCompleto").value;
    var edadUsuario = document.getElementById("edadUsuario").value;
    var emailUsuario = document.getElementById("emailUsuario").value;
    var telefonoUsuario = document.getElementById("telefonoUsuario").value;

    var loginObj = {
        name: nombreCompleto,
        age: edadUsuario,
        email: emailUsuario,
        phone: telefonoUsuario
    };
    localStorage.setItem("userInfo", JSON.stringify(loginObj));
}

function obtenerDatos() {
    var loginObj = JSON.parse(localStorage.getItem("userInfo"));
    if(loginObj != null){
       
        document.getElementById("nombreCompleto").value = "Nombre: " + loginObj.name;
        if (loginObj.age != ""){
            document.getElementById("edadUsuario").value = "Edad: " + loginObj.age + " años";
        }
        document.getElementById("emailUsuario").value = "E-mail: " + loginObj.email;
        document.getElementById("telefonoUsuario").value = "Telefono: " + loginObj.phone;
    }
}

var esModificable = false;
function cambiarBoton() {
    var boton = document.getElementById("toggleEditButton");
    if (!esModificable) {
        boton.style = "background-color: blue;"
        boton.innerHTML =
            `
            Guardar Modificación
            `
    } else {
        boton.style = "background-color: red;"
        boton.innerHTML =
            `
        Modificar datos Personales
        `
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    obtenerDatos();
    document.getElementById("toggleEditButton").addEventListener("click", function(event){
        event.preventDefault();
        permitirModificar();
    });

   
    })
