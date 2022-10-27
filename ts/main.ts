class BabyProduct{
    productName: string;
    productPrice: number;
    productRating: string;
    expirationDate: string;
    isOnlineOnly: boolean;
}

//test code
let myProduct = new BabyProduct();
myProduct.productName = "Similac";
myProduct.productPrice = 29;
myProduct.productRating = "★★★★★";
myProduct.expirationDate = "01/03/2024";
myProduct.isOnlineOnly = false;

var legendCount = 0;
var productCount = 0;
var ulErrCount = 0;

window.onload = function(){
    let addBtn = <HTMLElement>document.getElementById("addButton");
    addBtn.onclick = addProduct;
}

function addProduct(){
    if (isAllDataValid()){
        let product = getBabyProduct();
        productCount++;
        displayProduct(product);
        (<HTMLFormElement>getByID("myForm")).reset();
    }
}

// display Product
function displayProduct(myProduct:BabyProduct):void{
    // create a fieldset to display products added
    createDisplayFrame();

    let displayDiv = getByID("display-div");

    

    // create <h2> for Product Name
    let productHeading = document.createElement("h2");
    productHeading.innerText = myProduct.productName;
        
/*
    // create paragraph with product details
    let productInfo = document.createElement("p");
    let orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly){
        orderOptions = "online only.";
    }
    productInfo.innerText = myProduct.productName 
                          + " has a rating of " + myProduct.productRating
                          + ". It costs $" + myProduct.productPrice
                          + ". Available " + orderOptions;
*/
    // add <h2> in the <div id="display-error-msg">
    displayDiv.appendChild(productHeading);

    // add <p> for productInfo in the <div id="display-error-msg">
    // displayDiv.appendChild(productInfo);

    // create and add ul list with product details 
    let ulID = "ul-" + productCount;  
    let createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    displayDiv.appendChild(createUL);
    
    // insert this product to top of display
    displayDiv.insertBefore(createUL, displayDiv.children[0]);

    let orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly){
        orderOptions = "online only.";
    }

    if (myProduct.productRating == "Please choose a rating"){
        myProduct.productRating = "Rating being updated";
    }

    let productCountStr = productCount.toString();

    createLI(ulID, "Product Sequence: ", productCountStr);
    createLI(ulID, "Product Name: ", myProduct.productName);
    createLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createLI(ulID, "Product Rating: ", myProduct.productRating);
    createLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createLI(ulID, "Product Available: ", orderOptions);
    createLI(ulID, "-----------------------", "-----------------------");
    /*
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode("Product Name: " + myProduct.productName);
    createLI.appendChild(createLINote);
    getByID("ul-"+productCount).appendChild(createLI);
    */

    /*
    productInfo.innerText = myProduct.productName 
                          + " has a rating of " + myProduct.productRating
                          + ". It costs $" + myProduct.productPrice
                          + ". Available " + orderOptions;
    */
}

function createLI(id: string, a:string, b:string):void {
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}

function createDisplayFrame():void{
    while (legendCount == 0){
        // create and add fieldset to form to display Products
        let createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id","display-fieldset");
        
        let inventoryFieldset = getByID("display-fieldset");

        // create <legend>Inventory</legend>
        // add <legend>Inventory</legend> in the <fieldset id="inventory">
        let createLegend = document.createElement("LEGEND");
        let createTitle = document.createTextNode("Products added:");

        createLegend.appendChild(createTitle);

        inventoryFieldset.appendChild(createLegend)
                         .setAttribute("id","display-legend");

        let createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
                         .setAttribute("id","display-div");
            
        legendCount++;
    }
}

// add validation code
function isAllDataValid(){

    return true;
}

function getByID(id:string){
    return document.getElementById(id);
}

/**
 * get all Product data from the form
 * @returns in its BabyProduct objects
 */
function getBabyProduct():BabyProduct{
    // Create Product
    let product = new BabyProduct();

    // Populate with data from the form
    product.productName = (<HTMLInputElement>getByID("product-name")).value;
    product.productPrice = parseFloat((<HTMLInputElement>getByID("product-price")).value);
    product.productRating = (<HTMLSelectElement>getByID("product-rating")).value;
    product.expirationDate = getValidDate("expiration-date");

    let onlineOnly = <HTMLInputElement>getByID("online-only");
    product.isOnlineOnly = onlineOnly.checked;
    /*
    if(onlineOnly.checked){
        product.isOnlineOnly = true;
    }
    else{
        product.isOnlineOnly = false;
    }
    */

    // return the product
    return product;
    
}

/**
 * checks valid date input
 * @param input date
 * @returns true if input date is valid
 */
function isValidDate(input: string):boolean{
    // Validating mm/dd/yyyy or m/d/yyyy
    // \d{1,2}\/d{1,2}\/d{4}
    let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;

    return pattern.test(input);
}

/**
 * get the valid date from date input
 * @param id of the date input textbox
 * @returns valid date from input textbox
 */
function getValidDate(id:string):string {
    let dateBox = <HTMLInputElement>getByID(id);
    let dateBoxValue = dateBox.value;

    
    if (!isValidDate(dateBoxValue)) {
        let errSpan = dateBox.nextElementSibling;
        errSpan.innerHTML = "Format should be mm/dd/yyyy";
    }
    
    return dateBoxValue;
}

function createErrorDisplay():void{
    while (ulErrCount == 0){
        // create and add fieldset to form to display Products
        let createFieldset = document.createElement("FIELDSET");
        document.body.appendChild(createFieldset).setAttribute("id","display-fieldset");
        
        let inventoryFieldset = getByID("display-fieldset");

        // create <legend>Inventory</legend>
        // add <legend>Inventory</legend> in the <fieldset id="inventory">
        let createLegend = document.createElement("LEGEND");
        let createTitle = document.createTextNode("Products added:");

        createLegend.appendChild(createTitle);

        inventoryFieldset.appendChild(createLegend)
                         .setAttribute("id","display-legend");

        let createDiv = document.createElement("div");
        inventoryFieldset.appendChild(createDiv)
                         .setAttribute("id","display-div");
            
        ulErrCount++;
    }
}