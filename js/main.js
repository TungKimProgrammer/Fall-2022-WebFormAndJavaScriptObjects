var BabyProduct = (function () {
    function BabyProduct() {
    }
    return BabyProduct;
}());
var legendCount = 0;
var productCount = 0;
var ulErrCount = 0;
window.onload = function () {
    var addBtn = getByID("addButton");
    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", addProduct);
    specialKeyEventListener("product-name");
    specialKeyEventListener("product-price");
    specialKeyEventListener("expiration-date");
};
function specialKeyEventListener(id) {
    var input = getByID(id);
    var addBtn = getByID("addButton");
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addBtn.click();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            getByID("myForm").reset();
            clearErrMsg();
        }
    });
}
function addProduct() {
    addInputEventToClearErrors();
    if (isAllDataValid()) {
        clearErrMsg();
        var product = getBabyProduct();
        productCount++;
        displayProduct(product);
        getByID("myForm").reset();
    }
}
function isAllDataValid() {
    createErrorDisplay();
    addInputEventToClearErrors();
    var productName = getByID("product-name").value.trim();
    var productPrice = getByID("product-price").value.trim();
    var productRating = getByID("product-rating").value.trim();
    var expirationDate = getByID("expiration-date").value.trim();
    if (productName !== ""
        && productPrice !== ""
        && !isNaN(parseFloat(productPrice))
        && parseFloat(productPrice) > 0
        && productRating !== "Please choose a rating"
        && isValidDate(expirationDate)) {
        return true;
    }
    else {
        if (!isValidDate(expirationDate)) {
            createErrLI("validationUL", "Format should be mm/dd/yyyy");
        }
        if (productRating == "Please choose a rating") {
            createErrLI("validationUL", "You must choose Product Rating");
        }
        if (productPrice == "") {
            createErrLI("validationUL", "Product Price can't be empty!");
        }
        else if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0) {
            createErrLI("validationUL", "Product Price must be a valid number!");
        }
        if (productName == "") {
            createErrLI("validationUL", "Product Name can't be empty!");
        }
        return false;
    }
}
function getByID(id) {
    return document.getElementById(id);
}
function getBabyProduct() {
    var product = new BabyProduct();
    product.productName = getByID("product-name").value.trim();
    product.productPrice = parseFloat(getByID("product-price").value.trim());
    product.productRating = getByID("product-rating").value.trim();
    product.expirationDate = getByID("expiration-date").value.trim();
    var onlineOnly = getByID("online-only");
    product.isOnlineOnly = onlineOnly.checked;
    return product;
}
function isValidDate(input) {
    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    return pattern.test(input);
}
function createErrorDisplay() {
    var validationDiv = getByID("error-div");
    while (ulErrCount == 0) {
        var createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; margin-left: 100px;");
        validationDiv.appendChild(createUL);
        ulErrCount++;
    }
}
function createErrLI(id, s) {
    var createLI = document.createElement("LI");
    var createLINote = document.createTextNode(s);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
    getByID(id).insertBefore(createLI, getByID(id).children[0]);
}
function clearErrMsg() {
    getByID("validationUL").innerHTML = '';
}
function addInputEventToClearErrors() {
    getByID("product-name").addEventListener("input", clearErrMsg);
    getByID("product-price").addEventListener("input", clearErrMsg);
    getByID("product-rating").addEventListener("input", clearErrMsg);
    getByID("expiration-date").addEventListener("input", clearErrMsg);
}
function displayProduct(myProduct) {
    createDisplayFrame();
    var displayDiv = getByID("display-div");
    var ulID = "ul-" + productCount;
    var createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; margin-left: 70px;");
    displayDiv.appendChild(createUL);
    displayDiv.insertBefore(createUL, displayDiv.children[0]);
    var orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly) {
        orderOptions = "online only.";
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
