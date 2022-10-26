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
window.onload = function () {
    var addBtn = document.getElementById("addButton");
    addBtn.onclick = addProduct;
};
function addProduct() {
    if (isAllDataValid()) {
        var product = getBabyProduct();
        displayProduct(product);
    }
}
function displayProduct(myProduct) {
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
    product.expirationDate = getValidDate("product-date");
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
