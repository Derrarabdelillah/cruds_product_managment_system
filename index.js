// Get Total
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let mood = 'create';

let tmp;

// Get Total Function
function getTotal() {
    if(price.value != "" && taxes.value != "" && ads.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "Please fill all the fields";
        total.style.backgroundColor = "#b9b9b9";
    }
}

// Load products from localStorage with error handling
let dataProd = [];
try {
    if(localStorage.getItem("product") !== null) {
        dataProd = JSON.parse(localStorage.getItem("product"));
    }
} catch (error) {
    console.error("Error loading products from localStorage:", error);
    dataProd = [];
}

// Save to localStorage with error handling
function saveToLocalStorage() {
    try {
        localStorage.setItem("product", JSON.stringify(dataProd));
        return true;
    } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert("Failed to save products. Storage might be full.");
        return false;
    }
}

// create product
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let create = document.querySelector("#create");
let count = document.querySelector("#count");

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
    if(title.value != '' && price.value != '' && category.value != '' && newProd.count < 100) {
        if(mood === "create") {
            if(newProd.count > 1) {
                for(let i = 0; i < newProd.count; i++) {
                    dataProd.push(newProd);
                } 
            } else {
                dataProd.push(newProd);
            }
        } else {
            dataProd[tmp] = newProd;
            mood = "create";
            create.innerHTML = "Create";
            count.style.display = 'block';
        }

        // clear inputs 
        clearInputs();
    } else if(newProd.count > 100) {
        window.alert("Sorry you can't add more than 100 products");    
    }

    // save data to local storage and show data
    if(saveToLocalStorage()) {
        showData();
    }
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
    for(let i = 0; i < dataProd.length; i++) {
        table += `
            <tr>
                <td data-label="ID">${i + 1}</td>
                <td data-label="Title">${dataProd[i].title}</td>
                <td data-label="Price">${dataProd[i].price}</td>
                <td data-label="Taxes">${dataProd[i].taxes}</td>
                <td data-label="Ads">${dataProd[i].ads}</td>
                <td data-label="Discount">${dataProd[i].discount}</td>
                <td data-label="Total">${dataProd[i].total}</td>
                <td data-label="Category">${dataProd[i].category}</td>
                <td data-label="Update"><button class="update" onclick="updateData(${i})">update</button></td>
                <td data-label="Delete"><button onclick="delPro(${i})" class="delete">delete</button></td>
            </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = table;

    let btnDelAll = document.getElementById("delAll");
    if(dataProd.length > 0) {
        btnDelAll.innerHTML = `<button onclick="delAll()">Delete all (${dataProd.length})</button>`;
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
    saveToLocalStorage();
    // show data
    showData();
}

// delete all products function
function delAll() {
    try {
        // Clear Local Storage
        localStorage.removeItem("product");
        dataProd = [];
        // Clear Inputs Fields
        clearInputs();
        // Update the display
        showData();

        // Show Confirmation To user
        alert("All Products have been deleted successfully!");
    } catch (error) {
        console.error("Error clearing localStorage:", error);
        alert("There was a problem deleting all products. Please try again.")
    }
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
    });
}

// search
let searchMood = "title";
function getSearch(id) {
    let search = document.getElementById("search");

    if(id === "search-title") {
        searchMood = "title"; // Fixed assignment operator
        search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value = '';
    showData();
}

function Search(value) {
    let table = '';

    for(let i = 0; i < dataProd.length; i++) {
        let match = false;
        if(searchMood === "title" && dataProd[i].title.includes(value.toLowerCase())) {
            match = true;
        } else if(searchMood === "category" && dataProd[i].category.includes(value.toLowerCase())) {
            match = true;
        }

        if(match) {
            table += `
                <tr>
                    <td data-label="ID">${i + 1}</td>
                    <td data-label="Title">${dataProd[i].title}</td>
                    <td data-label="Price">${dataProd[i].price}</td>
                    <td data-label="Taxes">${dataProd[i].taxes}</td>
                    <td data-label="Ads">${dataProd[i].ads}</td>
                    <td data-label="Discount">${dataProd[i].discount}</td>
                    <td data-label="Total">${dataProd[i].total}</td>
                    <td data-label="Category">${dataProd[i].category}</td>
                    <td data-label="Update"><button class="update" onclick="updateData(${i})">update</button></td>
                    <td data-label="Delete"><button onclick="delPro(${i})" class="delete">delete</button></td>
                </tr>
            `;
        }
    }

    document.getElementById("tbody").innerHTML = table;
}
