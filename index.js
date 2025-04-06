
// Get Total
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");

// Get Total Function
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

    if( newProd.title != "" && newProd.price != "" && newProd.taxes != "" && newProd.ads != "" && newProd.discount != "" && newProd.category != "" && newProd.total != ""  ) {
        dataProd.push(newProd);
        // save data to local storage
        localStorage.setItem("product", JSON.stringify(dataProd) );
    }

    // clear inputs 
    clearInputs();

    // Show Data
    showData();
}

// clear inputs Function
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#b9b9b9";
}

// read 

function showData() {
    let table = "";
    for( let i = 0; i < dataProd.length; i++ ) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price}</td>
                        <td>${dataProd[i].taxes}</td>
                        <td>${dataProd[i].ads}</td>
                        <td>${dataProd[i].discount}</td>
                        <td>${dataProd[i].total}</td>
                        <td>${dataProd[i].category}</td>
                        <td><button class="update">update</button></td>
                        <td><button onclick="delPro(${i})" class="delete">delete</button</td>
                    </tr>
        `
        document.getElementById("tbody").innerHTML = table;
    }
}
// show data
showData();

// delete product function
function delPro(i) {
        // delete data from the array
        dataProd.splice(i,1);
        // delete data from local storage
        localStorage.product = JSON.stringify(dataProd);
        // show data
        showData();
        // I have a probleme in delete function is in the first item of the table or array
}


// count
// update
// search