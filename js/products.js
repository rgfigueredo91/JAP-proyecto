const ORDER_BY_PROD_PRICE = "$a";
const ORDER_BY_PROD_PRICE2 = "$b";
const ORDER_BY_PROD_COUNT = "Rel.";
var currentProdudctsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_BY_PROD_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return 1; }
            if ( a.cost < b.cost){ return -1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRICE2){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return -1; }
            if ( a.cost < b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between" id="nameAuto>
                        <h4 class="mb-1">`+ product.name +" - U$S "+ product.cost +`</h4>
                        <small class="text-muted">` +product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProdudctsArray = productsArray;
    }

    currentProdudctsArray = sortProducts(currentSortCriteria, currentProdudctsArray);

    //Muestro las categorías ordenadas
    showProductList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProdudctsArray = resultObj.data;
            currentProdudctsArray = sortProducts(ORDER_BY_PROD_PRICE, currentProdudctsArray);
            showProductList(currentProdudctsArray)
            
        }
    });

    let filteredArray = [];
    const searchBar = document.getElementById('searchBar');
    searchBar.onkeyup = () => {
        console.log("key up")
        let searchString = searchBar.value.toLowerCase();
        filteredArray = currentProdudctsArray.filter(item => {
            return item.name.toLowerCase().indexOf(searchString) > -1 || item.description.toLowerCase().indexOf(searchString) > -1;
        });
        showProductList(filteredArray)
    };

    searchBar.addEventListener("search", function(event){
        filteredArray = productsArray;
        showProductList(filteredArray);
    })

    document.getElementById("sortAsc").addEventListener("click", function(){
    let tempArray = sortProducts(ORDER_BY_PROD_PRICE, filteredArray)
    showProductList(tempArray)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_BY_PROD_PRICE2, filteredArray)
        showProductList(tempArray)
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
         let tempArray = sortProducts(ORDER_BY_PROD_COUNT, filteredArray)
         showProductList(tempArray)
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList(tempArray);
    });

 

  

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
 



});