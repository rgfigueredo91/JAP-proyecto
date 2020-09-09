let category = {};


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}





//boton para enviar
//botonEnviar

//id nombre
//nameid


//id text area
//nuevoComentario



function enviarComentario(){
    console.log("prueba");
    let name = document.getElementById("nameid").value;
    let comentario = document.getElementById("nuevoComentario").value;
    let fecha = new Date();
    let dia = fecha.getDate();
    if(dia<10) {
        dia='0'+dia;
    } 
    let mes = fecha.getMonth()+1;
    if(mes<10) {
        mes='0'+mes;
    } 


    let year =  fecha.getFullYear()
    let hora = fecha.toLocaleTimeString()
    let fechaEnviada = year + " - " + mes + "-" + dia + " - " +  hora;


   


    let inputs = document.getElementsByName("puntaje");
    for (let i = 0, length = inputs.length; i < length; i++) {
        if (inputs[i].checked) {
            // do whatever you want with the checked radio
            score = inputs[i].value
        }}

        let arrayComentarios = {
            "score": score,
            "description": comentario ,
            "user": name,
            "dateTime": fechaEnviada
        };
  




        comments.push(arrayComentarios);
        showCommentsList(comments);

   
}


function showCommentsList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let commentElement = array[i];
        let scorePoints = commentElement.score;
        htmlContentToAppend += `
        <div id="comentario">
            <h4 style="text-align: left;">
              <span style="display: inline-flex; padding-left: 40px;"><i class="fas fa-user-alt"></i></span><span style="display: inline-flex; vertical-align: bottom;" id="userComment"><strong>`+commentElement.user+`</strong></span>
              <span style="float: right; padding-right: 40px ;" id="score">Calificacion: `+scorePoints+`</span>
            </h4>
            <hr>
            <p style="text-align: center ;" id="descriptionComment">`+commentElement.description+`</p>
            <p style="margin: 15px 0 0 0 ;" id="dateComment"><em>`+commentElement.dateTime+`</em></p>
          </div>
        `

        document.getElementById("comentariosEnviados").innerHTML = htmlContentToAppend;
        
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;
            let nombreProducto = document.getElementById("productName");
            let descripcionProducto = document.getElementById("productDescription");
            let ventaProducto = document.getElementById("productSold");
            let categoriaProducto = document.getElementById("productCategory");
            let precioProducto = document.getElementById("productPrice");

            nombreProducto.innerHTML = category.name;
            descripcionProducto.innerHTML = category.description;
            ventaProducto.innerHTML = category.soldCount;
            categoriaProducto.innerHTML = category.category;
            precioProducto.innerHTML = category.cost;
            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

        comments = resultObj.data;
        showCommentsList(comments);
});


});
