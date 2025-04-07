
// Get Total
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let mood = '';

let tmp;

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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // count and update button

if( title.value != '' && price.value != '' && category.value != '' && newProd.count < 100) {
    
    if( mood === "create" ) {
        if( newProd.count > 1 ) {
            for( let i = 0; i < newProd.count; i++) {
                dataProd.push(newProd);
            } 
        } else {
            dataProd.push(newProd);
        }
    } else {
        dataProd[tmp] = newProd;
        mood = "create";
        create.innerHTML = "Create";
    }
    // clear inputs 
    clearInputs();
} else if( newProd.count > 100 ) {
    window.alert("Sorry you can't add more than 100 products");    
}

    // save data to local storage
    localStorage.setItem("product", JSON.stringify(dataProd) );

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
                        <td><button class="update" onclick="updateData(${i})" >update</button></td>
                        <td><button onclick="delPro(${i})" class="delete">delete</button></td>
                        </tr>
                        `
}
    document.getElementById("tbody").innerHTML = table;
                            
    let btnDelAll = document.getElementById("delAll");
    if(dataProd.length > 0) {
        btnDelAll.innerHTML = `<button onclick="delAll()" >Delete all (${dataProd.length}) </button>`;
    } else {
        btnDelAll.innerHTML = "";
    }

} 

// show data
showData();

// delete product function
function delPro(i) {
        // delete data from the array
        dataProd.splice(i, 1);
        // delete data from local storage
        localStorage.product = JSON.stringify(dataProd);
        // show data
        showData();
        // I have a probleme in delete function is in the first item of the table or array
}

// delete all proudcts function
function delAll() {
    localStorage.clear();
    dataProd.splice(0);
    showData();
}

// update
function updateData(i) {
    // get the data of the clicked button and put it on the input fields
    title.value = dataProd[i].title;
    price.value = dataProd[i].price;
    taxes.value = dataProd[i].taxes;
    ads.value = dataProd[i].ads;
    discount.value = dataProd[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProd[i].category;
    // change the create button to update button
    create.innerHTML = "Update";
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// search
let searchMood = "title";
function getSearch(id) {
    let search = document.getElementById("search");

    if( id === "search-title" ) {
        searchMood === "title";
        search.placeholder = "Search By Title"
    } else {
        searchMood = "Category";
        search.placeholder = "Search By Category"
    }
    search.focus();
    search.value = '';
    showData();
}

function Search(value) {

    let table = '';
    for( let i = 0; i < dataProd.length; i++ ) {

        if( searchMood === "title" ) {
            
            if( dataProd[i].title.includes(value.toLowerCase()) ) {
                
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
                    <td><button class="update" onclick="updateData(${i})" >update</button></td>
                    <td><button onclick="delPro(${i})" class="delete">delete</button></td>
                    </tr>
                    `
    
            } 


        } else {

            if( dataProd[i].category.includes(value.toLowerCase()) ) {
                
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
                    <td><button class="update" onclick="updateData(${i})" >update</button></td>
                    <td><button onclick="delPro(${i})" class="delete">delete</button></td>
                    </tr>
                    `
    
            }

        }
        
        document.getElementById("tbody").innerHTML = table;
    }

}
// Clean Data