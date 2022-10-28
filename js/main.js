class BabyProduct {
}
var legendCount = 0;
var productCount = 0;
var ulErrCount = 0;
window.onload = function () {
    let addBtn = getByID("addButton");
    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", addProduct);
    specialKeyEventListener("product-name");
    specialKeyEventListener("product-price");
    specialKeyEventListener("expiration-date");
};
function specialKeyEventListener(id) {
    let input = getByID(id);
    let addBtn = getByID("addButton");
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
        let product = getBabyProduct();
        productCount++;
        displayProduct(product);
        getByID("myForm").reset();
    }
}
function isAllDataValid() {
    createErrorDisplay();
    addInputEventToClearErrors();
    let pName = getInputValueByID("product-name").trim();
    let pPrice = getInputValueByID("product-price").trim();
    let rating = getByID("product-rating");
    let ratingIndex = rating.selectedIndex;
    let expDate = getInputValueByID("expiration-date").trim();
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
    let product = new BabyProduct();
    product.productName = getInputValueByID("product-name").trim();
    product.productPrice = parseFloat(getInputValueByID("product-price").trim());
    product.productRating = getInputValueByID("product-rating");
    product.expirationDate = getInputValueByID("expiration-date").trim();
    let onlineOnly = getByID("online-only");
    product.isOnlineOnly = onlineOnly.checked;
    return product;
}
function isValidDate(input) {
    let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    let isCorrectFormat = pattern.test(input);
    return isCorrectFormat;
}
function addExpirationStatus(input) {
    let month = parseInt(input.substring(0, input.indexOf("/")));
    let day = parseInt(input.substring(input.indexOf("/") + 1, input.lastIndexOf("/")));
    let year = parseInt(input.substring(input.lastIndexOf("/") + 1, input.length));
    let today = new Date();
    let date = new Date(year, month - 1, day + 1);
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
    let validationDiv = getByID("error-div");
    validationDiv.setAttribute("style", "display: flex; \
                                         justify-content: center; ");
    while (ulErrCount == 0) {
        let createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; \
                                        text-align:left; \
                                        display: inline-block;");
        validationDiv.appendChild(createUL);
        ulErrCount++;
    }
}
function createErrLI(id, s) {
    let createLI = document.createElement("LI");
    let createSpan = document.createElement("SPAN");
    let createNote = document.createTextNode(s);
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
    let displayDiv = getByID("display-div");
    displayDiv.setAttribute("style", "text-align: center;");
    let ulID = "ul-" + productCount;
    let createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; \
                                    display: inline-block; \
                                    text-align: left; \
                                    width: 80%; \
                                    margin: auto; ");
    displayDiv.appendChild(createUL);
    displayDiv.insertBefore(createUL, displayDiv.children[0]);
    let orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly) {
        orderOptions = "online only.";
    }
    let productCountStr = productCount.toString();
    createLI(ulID, "Product adding order: ", productCountStr);
    createLI(ulID, "Product Name: ", myProduct.productName);
    createLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createLI(ulID, "Product Rating: ", myProduct.productRating);
    createLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createLI(ulID, "Expiration Status: ", addExpirationStatus(myProduct.expirationDate));
    createLI(ulID, "Product Available: ", orderOptions);
    createLI(ulID, "-----------------------", "-----------------------");
    changeTextColor(ulID, "expired!", "EXPIRED!", "red");
}
function changeTextColor(id, wordToChange, newWord, color) {
    var element = getByID(id);
    var originalHtml = element.innerHTML;
    var newHtml = originalHtml.replace(new RegExp('\\b' + wordToChange + '\\b', "g"), newWord.fontcolor(color));
    element.innerHTML = newHtml;
}
function createLI(id, a, b) {
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI).setAttribute("width", "100%");
}
function createDisplayFrame() {
    while (legendCount == 0) {
        let createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id", "display-fieldset");
        let inventoryFieldset = getByID("display-fieldset");
        let createLegend = document.createElement("LEGEND");
        let createTitle = document.createTextNode("Products added:");
        createLegend.appendChild(createTitle);
        inventoryFieldset.appendChild(createLegend)
            .setAttribute("id", "display-legend");
        let createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
            .setAttribute("id", "display-div");
        legendCount++;
    }
}
