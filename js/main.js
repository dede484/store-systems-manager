let prodName = document.getElementById("name");
let note = document.getElementById("note");
let quantity = document.getElementById("quantity");
let cost = document.getElementById("cost");
let profit = document.getElementById("profit");
let price = document.getElementById("price");
let submit = document.getElementById("add-product");
let container = document.getElementById("container");
let infoContainer = document.getElementById("infoContainer");
let infoBtn = document.getElementById("info_i");
let closeBtn = document.getElementById("close_i");
let noteList = document.getElementById("noteList");
let infoCost = document.getElementById("infoCost");
let infoProfit = document.getElementById("infoProfit");
let infoName = document.getElementById("infoName")
let removeBtnCont = document.getElementById("removeBtnCont");
let uniqId;
let createFlag = true;
let thisProduct;

// Getting The Total Price
let totalPrice;
function getTotalPrice () {
    if (cost.value == '') {
        price.innerHTML = 'Total Price = ';
    }else {
        if (cost.value > 0) {
            totalPrice = +cost.value + +profit.value;
            price.innerHTML = `Total Price = ${totalPrice}$`;
        }else {
            price.innerHTML = 'Please Enter a Valid Price';
        }
    }
}

cost.onkeyup = () => {
    getTotalPrice()
}
profit.onkeyup = () => {
    getTotalPrice()
}

// Local Storage
let prodData;
if (localStorage.products != null) {
    prodData = JSON.parse(localStorage.products)
}else {
    prodData = [];
}

submit.onclick = () => {
    if (prodName.value != '' && cost.value != '' && profit.value != '') {
        if (createFlag) {
            geneUniqId();
        }else {
            getTotalPrice()
        }
        storeProductData();
        clearInputs();
        showData();
    }
}
// Generate Uni Id
function geneUniqId () {
    if (localStorage.ids != null) {
        uniqId = Number(localStorage.ids);
        uniqId++;
        localStorage.setItem('ids', uniqId.toString());
    }else {
        uniqId = 111111111;
        localStorage.setItem('ids', uniqId.toString());
    }
}

// store data

function storeProductData() {
    let newprod = {
        name: prodName.value,
        note: note.value,
        quantity: quantity.value,
        cost: cost.value,
        profit: profit.value,
        price: totalPrice,
    }
    if (createFlag) {
        newprod.id = uniqId,
        prodData.unshift(newprod);
    }else {
        newprod.id = prodData[thisProduct].id;
        prodData[thisProduct] = newprod;
        createFlag = true;
        submit.innerHTML = `ADD`;
        submit.style.backgroundColor = '#720000';
        submit.classList.remove('adder_create','adder_update');
        submit.classList.add('adder_create')
    }
    localStorage.setItem('products', JSON.stringify(prodData));
}

function clearInputs() {
    prodName.value = '';
    note.value = '';
    quantity.value = '1';
    cost.value = '';
    profit.value = '';
    price.innerHTML = 'Total Price = ';
}

function showData() {
    let row = '';
    for (let i = 0; i < prodData.length; i++) {
        row += `
        <tr>
            <td>${prodData[i].name}</td>
            <td>${prodData[i].id}</td>
            <td>${prodData[i].price}$</td>
            <td>${prodData[i].quantity}</td>
            <td class="actions">
                <button class="action-icons sell"><span class="material-symbols-outlined">sell</span></button>
                <button onclick="updateData(${i})"class="action-icons update"><span class="material-symbols-outlined">edit</span></button>
                <button onclick="showInfo(${i})" class="action-icons info_i"><span class="material-symbols-outlined">info_i</span></button>
            </td>
        </tr>`;
        document.getElementById("tbody").innerHTML = row;
    }
}
showData();

// delete
function delProd(i) {
    if (prodData.length > 1) {
        prodData.splice(i, 1);
        localStorage.products = JSON.stringify(prodData);
        showData();
    }else {
        prodData.splice(0);
        localStorage.removeItem("products");
        document.getElementById("tbody").innerHTML = ``;
    }
    closeInfo();
}

// info
closeBtn.onclick = closeInfo;

function closeInfo() {
    infoContainer.style.display = "none";
    container.style.setProperty("--contBefore-display", "none");
    window.onscroll = () => {
        window.scroll.apply;
    }
}

function showInfo(i) {
    infoContainer.style.display = "flex";
    container.style.setProperty("--contBefore-display", "block");
    infoName.innerHTML = `${prodData[i].name}`
    noteList.innerHTML = `<li>${prodData[i].note}</li>`;
    infoCost.innerHTML = `<p>${prodData[i].cost}$</p>`;
    infoProfit.innerHTML = `<p>${prodData[i].profit}$</p>`;
    removeBtnCont.innerHTML = `<button onclick="delProd(${i})" class="removeBtn">Delete Product</button>`;
    scroll({
        top: 0,
        behavior: "smooth",
    })
    window.onscroll = () => {
        window.scroll(0, 0);
    }
}

// update

function updateData(i) {
    prodName.value = prodData[i].name;
    note.value = prodData[i].note;
    quantity.value = prodData[i].quantity;
    cost.value = prodData[i].cost;
    profit.value = prodData[i].profit;
    price.innerHTML = `Total Price = ${prodData[i].price}$`;
    submit.innerHTML = `UPDATE`;
    submit.style.backgroundColor = 'rgb(0, 150, 30)';
    submit.classList.remove('adder_create','adder_update');
    submit.classList.add('adder_update')
    scroll({
        top: 0,
        behavior: "smooth",
    })
    thisProduct = i;
    createFlag = false;
}