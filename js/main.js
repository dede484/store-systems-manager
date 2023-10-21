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
let removeBtnCont = document.getElementById("removeBtnCont");
let uniqId;

//Getting The Total Price
let result;
function getTotalPrice () {
    if (cost.value == '') {
        price.innerHTML = 'Total Price = ';
    }else {
        if (cost.value > 0) {
            result = +cost.value + +profit.value;
            price.innerHTML = `Total Price = ${result}$`;
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

//Local Storage
let prodData;
if (localStorage.products != null) {
    prodData = JSON.parse(localStorage.products)
}else {
    prodData = [];
}

submit.onclick = () => {
    if (prodName.value != '' && cost.value != '' && profit.value != '') {
        geneUniqId();
        storeProductData();
        clearInputs();
        showData();
    }
}
//Generate Uni Id
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

function storeProductData() {
    let newprod = {
        name: prodName.value,
        id: uniqId,
        note: note.value,
        quantity: quantity.value,
        cost: cost.value,
        profit: profit.value,
        price: result,
    }
    prodData.unshift(newprod);
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
            <td>${prodData[i].price}</td>
            <td>${prodData[i].quantity}</td>
            <td class="actions">
                <button class="action-icons sell"><span class="material-symbols-outlined">sell</span></button>
                <button class="action-icons update"><span class="material-symbols-outlined">edit</span></button>
                <button onclick="showInfo(${i})" class="action-icons info_i"><span class="material-symbols-outlined">info_i</span></button>
            </td>
        </tr>`;
        document.getElementById("tbody").innerHTML = row;
    }
}
showData();

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

//info
closeBtn.onclick = closeInfo;

function closeInfo() {
    infoContainer.style.display = "none";
    container.style.setProperty("--contBefore-display", "none");
}

function showInfo(i) {
    infoContainer.style.display = "flex";
    container.style.setProperty("--contBefore-display", "block");
    noteList.innerHTML = `<li>${prodData[i].note}</li>`;
    infoCost.innerHTML = `<p>${prodData[i].cost}$</p>`;
    infoProfit.innerHTML = `<p>${prodData[i].profit}$</p>`;
    removeBtnCont.innerHTML = `<button onclick="delProd(${i})" class="removeBtn">Delete Product</button>`;
}