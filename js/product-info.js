let category = {};
let relatedProducts = {};
function showImagesGallery(array){
    let htmlContentToAppend = "";

        htmlContentToAppend += `
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="` + array[0] + `" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="` + array[1] + `" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="` + array[2] + `" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="` + array[3] + `" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                    <img src="` + array[4] + `" class="d-block w-100" alt="...">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    
}



function showRelated(array) {
    htmlContentToAppend = "";
    for (i = 0; i < category.relatedProducts.length; i++) {
        let cat = category.relatedProducts[i];
        let related = array[cat];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
             <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
        </div>
        </div>  `
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}



function enviarComentario(){
    console.log("prueba");
    let name = document.getElementById("nombre").innerHTML;
    console.log(name)
    let comentario = document.getElementById("nuevoComentario").value;
    let fecha = new Date();
    console.log(fecha)
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
              <span style="display: inline-flex; padding-left: 40px;"><i class=""></i></span><span style="display: inline-flex; vertical-align: bottom;" id="userComment"><strong>`+commentElement.user+`</strong></span>
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
           

            showImagesGallery(category.images);

            getJSONData(PRODUCTS_URL).then(function(releated) {
                if (releated.status === "ok") {

                    related = releated.data;
                    showRelated(related);
                }
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        comments = resultObj.data;
        showCommentsList(comments);
});
});

