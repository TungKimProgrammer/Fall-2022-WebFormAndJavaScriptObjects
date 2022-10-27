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
        var product = getBabyProduct();
        productCount++;
        displayProduct(product);
        getByID("myForm").reset();
    }
}
function isAllDataValid() {
    createErrorDisplay();
    addInputEventToClearErrors();
    var pName = getInputValueByID("product-name").trim();
    var pPrice = getInputValueByID("product-price").trim();
    var rating = getByID("product-rating");
    var ratingIndex = rating.selectedIndex;
    var expDate = getInputValueByID("expiration-date").trim();
    if (pName !== ""
        && pPrice !== ""
        && !isNaN(parseFloat(pPrice))
        && parseFloat(pPrice) > 0
        && ratingIndex !== 0
        && isValidDate(expDate)) {
        return true;
    }
    else {
        if (!isValidDate(expDate)) {
            createErrLI("validationUL", "Format should be mm/dd/yyyy");
        }
        if (ratingIndex == 0) {
            createErrLI("validationUL", "You must choose Product Rating");
        }
        if (pPrice == "") {
            createErrLI("validationUL", "Product Price can't be empty!");
        }
        else if (isNaN(parseFloat(pPrice)) || parseFloat(pPrice) <= 0) {
            createErrLI("validationUL", "Product Price must be a valid number!");
        }
        if (pName == "") {
            createErrLI("validationUL", "Product Name can't be empty!");
        }
        return false;
    }
}
function getByID(id) {
    return document.getElementById(id);
}
function getInputByID(id) {
    return getByID(id).value;
}
function getInputValueByID(id) {
    return getByID(id).value;
}
function getBabyProduct() {
    var product = new BabyProduct();
    product.productName = getInputValueByID("product-name").trim();
    product.productPrice = parseFloat(getInputValueByID("product-price").trim());
    product.productRating = getInputValueByID("product-rating");
    product.expirationDate = getInputValueByID("expiration-date").trim();
    var onlineOnly = getByID("online-only");
    product.isOnlineOnly = onlineOnly.checked;
    return product;
}
function isValidDate(input) {
    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    var isCorrectFormat = pattern.test(input);
    return isCorrectFormat;
}
function addExpirationStatus(input) {
    var month = parseInt(input.substring(0, input.indexOf("/")));
    var day = parseInt(input.substring(input.indexOf("/") + 1, input.lastIndexOf("/")));
    var year = parseInt(input.substring(input.lastIndexOf("/") + 1, input.length));
    var today = new Date();
    var date = new Date(year, month - 1, day + 1);
    console.log(today);
    console.log(date);
    if (today > date) {
        return "expired!";
    }
    else {
        return "unexpired!";
    }
}
function createErrorDisplay() {
    var validationDiv = getByID("error-div");
    validationDiv.setAttribute("style", "display: flex; \
                                         justify-content: center; ");
    while (ulErrCount == 0) {
        var createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; \
                                        text-align:left; \
                                        display: inline-block;");
        validationDiv.appendChild(createUL);
        ulErrCount++;
    }
}
function createErrLI(id, s) {
    var createLI = document.createElement("LI");
    var createSpan = document.createElement("SPAN");
    var createNote = document.createTextNode(s);
    createLI.appendChild(createSpan);
    createSpan.appendChild(createNote);
    getByID(id).appendChild(createLI);
    getByID(id).insertBefore(createLI, getByID(id).children[0]);
}
function clearErrMsg() {
    if (ulErrCount != 0) {
        getByID("validationUL").innerHTML = "";
    }
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
    displayDiv.setAttribute("style", "display: flex; \
                                      justify-content: center;");
    var ulID = "ul-" + productCount;
    var createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; \
                                    text-align:left; \
                                    display: inline-block;");
    displayDiv.appendChild(createUL);
    displayDiv.insertBefore(createUL, displayDiv.children[0]);
    var orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly) {
        orderOptions = "online only.";
    }
    var productCountStr = productCount.toString();
    createLI(ulID, "Product adding order: ", productCountStr);
    createLI(ulID, "Product Name: ", myProduct.productName);
    createLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createLI(ulID, "Product Rating: ", myProduct.productRating);
    createLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createLI(ulID, "Expiration Status: ", addExpirationStatus(myProduct.expirationDate));
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
