//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var precioTotal = document.getElementById("costoTotal");
var totalProductos = document.getElementById("costoProducto");
var gastoPorcentaje = document.getElementById("comision");


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {   
            carrito = resultObj.data;
            mostrarArticulos(carrito.articles);
        }
        });
    });

function chequeoPorcentajes () {
    let checkBox1 = document.getElementById("envio1");
    let checkBox2 = document.getElementById("envio2");
    let checkBox3 = document.getElementById("envio3");
    if (checkBox1.checked == true){
        return checkBox1.value}
        if (checkBox2.checked == true){
            return checkBox2.value
}            if (checkBox3.checked == true){
                return checkBox3.value
}
}



function subtotal(precioUnitario){

    let cantidad = document.getElementById("cantidadProductos").value;
    let subTotal = precioUnitario * cantidad;



    let porcentaje = subTotal * chequeoPorcentajes() / 100



    let total = subTotal + porcentaje
    document.getElementById("comision").innerHTML = porcentaje;
    document.getElementById("subtotal").innerHTML = subTotal;
    document.getElementById("costoProducto").innerHTML = subTotal;
    document.getElementById("costoTotal").innerHTML = total;
}

function actualizar(){
    let cantidad = document.getElementById("cantidadProductos").value;
    let subTotal = precioUnitario * cantidad;



    let porcentaje = subTotal * chequeoPorcentajes() / 100



    let total = subTotal + porcentaje
    document.getElementById("comision").innerHTML = porcentaje;
    document.getElementById("subtotal").innerHTML = subTotal;
    document.getElementById("costoProducto").innerHTML = subTotal;
    document.getElementById("costoTotal").innerHTML = total;
}


function mostrarArticulos(array){
    let contenido = "";
    for(let i = 0; i < array.length; i++){
     articulos = array[i];
        contenido += `
        <tr>
        <td><img src="`+ articulos.src + `" width="45px"></td>
        <td>`+ articulos.name +`</td>
        <td>`+ articulos.currency +`</td>
        <td>`+ articulos.unitCost +`</td>
        <td><input type="number" name="productInput" id="cantidadProductos" value="`+ articulos.count +`" min="1"></td>
        <td id="subtotal"></td>
        </tr>
        `
        document.getElementById("tablacarrito").innerHTML = contenido;
        }

        precioUnitario = articulos.unitCost;
        subtotal(precioUnitario);  
        document.getElementById("cantidadProductos").addEventListener("change", function(){
        subtotal(precioUnitario); 
        });
}



function finish() {
    if(document.getElementsByTagName("form")[0].checkValidity()){
        alert("tu compra fue realizada con exito")
    }
    else {
        alert("completa los datos")
    }
}