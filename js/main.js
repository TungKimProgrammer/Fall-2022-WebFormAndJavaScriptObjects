var BabyProduct = (function () {
    function BabyProduct() {
    }
    return BabyProduct;
}());
var myProduct = new BabyProduct();
myProduct.productName = "Similac";
myProduct.productPrice = 29;
myProduct.productRating = "★★★★★";
myProduct.expirationDate = "01/03/2024";
myProduct.isOnlineOnly = false;
var legendCount = 0;
var productCount = 0;
var ulErrCount = 0;
window.onload = function () {
    var addBtn = document.getElementById("addButton");
    addBtn.onclick = addProduct;
};
function addProduct() {
    if (isAllDataValid()) {
        var product = getBabyProduct();
        productCount++;
        displayProduct(product);
        getByID("myForm").reset();
    }
}
function displayProduct(myProduct) {
    createDisplayFrame();
    var displayDiv = getByID("display-div");
    var productHeading = document.createElement("h2");
    productHeading.innerText = myProduct.productName;
    displayDiv.appendChild(productHeading);
    var ulID = "ul-" + productCount;
    var createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    displayDiv.appendChild(createUL);
    displayDiv.insertBefore(createUL, displayDiv.children[0]);
    var orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly) {
        orderOptions = "online only.";
    }
    if (myProduct.productRating == "Please choose a rating") {
        myProduct.productRating = "Rating being updated";
    }
    var productCountStr = productCount.toString();
    createLI(ulID, "Product Sequence: ", productCountStr);
    createLI(ulID, "Product Name: ", myProduct.productName);
    createLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createLI(ulID, "Product Rating: ", myProduct.productRating);
    createLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createLI(ulID, "Product Available: ", orderOptions);
    createLI(ulID, "-----------------------", "-----------------------");
}
function createLI(id, a, b) {
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}
function createDisplayFrame() {
    while (legendCount == 0) {
        var createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id", "display-fieldset");
        var inventoryFieldset = getByID("display-fieldset");
        var createLegend = document.createElement("LEGEND");
        var createTitle = document.createTextNode("Products added:");
        createLegend.appendChild(createTitle);
        inventoryFieldset.appendChild(createLegend)
            .setAttribute("id", "display-legend");
        var createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
            .setAttribute("id", "display-div");
        legendCount++;
    }
}
function isAllDataValid() {
    return true;
}
function getByID(id) {
    return document.getElementById(id);
}
function getBabyProduct() {
    var product = new BabyProduct();
    product.productName = getByID("product-name").value;
    product.productPrice = parseFloat(getByID("product-price").value);
    product.productRating = getByID("product-rating").value;
    product.expirationDate = getValidDate("expiration-date");
    var onlineOnly = getByID("online-only");
    product.isOnlineOnly = onlineOnly.checked;
    return product;
}
function isValidDate(input) {
    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    return pattern.test(input);
}
function getValidDate(id) {
    var dateBox = getByID(id);
    var dateBoxValue = dateBox.value;
    if (!isValidDate(dateBoxValue)) {
        var errSpan = dateBox.nextElementSibling;
        errSpan.innerHTML = "Format should be mm/dd/yyyy";
    }
    return dateBoxValue;
}
function createErrorDisplay() {
    while (ulErrCount == 0) {
        var createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id", "display-fieldset");
        var inventoryFieldset = getByID("display-fieldset");
        var createLegend = document.createElement("LEGEND");
        var createTitle = document.createTextNode("Products added:");
        createLegend.appendChild(createTitle);
        inventoryFieldset.appendChild(createLegend)
            .setAttribute("id", "display-legend");
        var createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
            .setAttribute("id", "display-div");
        ulErrCount++;
    }
}
