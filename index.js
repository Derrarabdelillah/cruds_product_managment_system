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
let quantity = document.querySelector("#count");

// onclick event get product data and put it on array
create.onclick = function() {
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        quantity: quantity.value,
        category: category.value.toLowerCase(),
    }

    // quantity and update button
    if(title.value != '' && price.value != '' && category.value != '' && newProd.quantity < 100) {
        if(mood === "create") {
            if(newProd.quantity > 1) {
                for(let i = 0; i < newProd.quantity; i++) {
                    dataProd.push(newProd);
                } 
            } else {
                dataProd.push(newProd);
            }
        } else {
            dataProd[tmp] = newProd;
            mood = "create";
            create.innerHTML = "Create";
            quantity.style.display = 'block';
        }

        // clear inputs 
        clearInputs();
    } else if(newProd.quantity > 100) {
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
    quantity.value = "";
    category.value = "";
    total.style.backgroundColor = "#b9b9b9";
}

// read 
function showData() {
    let table = "";
    for(let i = 0; i < dataProd.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProd[i].title}</td>
                <td>$ ${dataProd[i].price}</td>
                <td>$ ${dataProd[i].taxes}</td>
                <td>$ ${dataProd[i].ads}</td>
                <td>$ ${dataProd[i].discount}</td>
                <td>$ ${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><i class="fa-solid fa-pen-to-square update" onclick="updateData(${i})"></i></td>
                <td><i class="fa-solid fa-x delete" onclick="delPro(${i})"></i></td>
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
    let show = document.querySelector(".show")
    try {
        // Clear localStorage
        localStorage.removeItem("product");
        
        // Reset the array to empty
        dataProd = [];
        
        // Clear all input fields
        clearInputs();
        
        // Update the display
        showData();
        
        // Optional: Show confirmation to user
        setTimeout(() => {
            show.classList.add("active");
        }, 1000);

        setTimeout(() => {
            show.classList.remove("active");
        }, 4000);
    } catch (error) {
        console.error("Error clearing localStorage:", error);
        alert("There was a problem deleting all products. Please try again.");
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
    quantity.style.display = 'none';
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
        if(searchMood === "title") {
            if(dataProd[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProd[i].title}</td>
                <td>$ ${dataProd[i].price}</td>
                <td>$ ${dataProd[i].taxes}</td>
                <td>$ ${dataProd[i].ads}</td>
                <td>$ ${dataProd[i].discount}</td>
                <td>$ ${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><i class="fa-solid fa-pen-to-square update" onclick="updateData(${i})"></i></td>
                <td><i class="fa-solid fa-x delete" onclick="delPro(${i})"></i></td>
            </tr>
                `;
            }
        } else {
            if(dataProd[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProd[i].title}</td>
                <td>$ ${dataProd[i].price}</td>
                <td>$ ${dataProd[i].taxes}</td>
                <td>$ ${dataProd[i].ads}</td>
                <td>$ ${dataProd[i].discount}</td>
                <td>$ ${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><i class="fa-solid fa-pen-to-square update" onclick="updateData(${i})"></i></td>
                <td><i class="fa-solid fa-x delete" onclick="delPro(${i})"></i></td>
            </tr>
                `;
            }
        }
    }
    
    // Moved outside the loop to avoid overwriting
    document.getElementById("tbody").innerHTML = table;
}