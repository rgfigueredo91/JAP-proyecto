//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {   
            carrito = resultObj.data;
            mostrarArticulos(carrito.articles);
        }
        });
    });


function subtotal(precioUnitario){
    let cantidad = document.getElementById("cantidadProductos").value;
    let subTotal = precioUnitario * cantidad;
    document.getElementById("subtotal").innerHTML = subTotal;
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


