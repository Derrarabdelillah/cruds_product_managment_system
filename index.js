// Get Total

let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");

function getTotal() {
    if( price.value != "" && taxes.value != "" && ads.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "Please fill all the fields";
        total.style.backgroundColor = "#b9b9b9";
    }
}

// create product
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let create = document.querySelector("#create");
let count = document.querySelector("#count");


let dataProd = [];

if( localStorage.product != null ) {
    dataProd = JSON.parse(localStorage.product);
} else {
    dataProd = [];
}

// onclick event get product data and put it on array
create.onclick = function() {
    let newProd = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if( newProd.title != "" && newProd.price != "" && newProd.taxes != "" && newProd.ads != "" && newProd.discount != "" && newProd.count != "" && newProd.category != "" && newProd.total != ""  ) {
        dataProd.push(newProd);
        // save data to local storage
        localStorage.setItem("product", JSON.stringify(dataProd) );
    }
}

// clear inputs
// read 
// count
// delete
// update
// search