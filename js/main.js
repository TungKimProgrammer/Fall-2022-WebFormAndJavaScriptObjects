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
window.onload = function () {
    var addBtn = document.getElementById("addButton");
    addBtn.onclick = addProduct;
};
function addProduct() {
    if (isAllDataValid()) {
        var product = getBabyProduct();
        productCount++;
        displayProduct(product);
    }
}
function displayProduct(myProduct) {
    createDisplayFrame();
    var displayDiv = getByID("display-div");
    var productHeading = document.createElement("h2");
    productHeading.innerText = myProduct.productName;
    displayDiv.appendChild(productHeading);
    var createUL = document.createElement("ul");
    createUL.setAttribute("id", "ul-" + productCount);
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
    createLI(productCountStr, "Product Sequence: ", productCountStr);
    createLI(productCountStr, "Product Name: ", myProduct.productName);
    createLI(productCountStr, "Product Price: $", myProduct.productPrice.toString());
    createLI(productCountStr, "Product Rating: ", myProduct.productRating);
    createLI(productCountStr, "Expiration Date: ", myProduct.expirationDate);
    createLI(productCountStr, "Product Available: ", orderOptions);
    createLI(productCountStr, "-----------------------", "-----------------------");
}
function createLI(id, a, b) {
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID("ul-" + id).appendChild(createLI);
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
    return dateBoxValue;
}
