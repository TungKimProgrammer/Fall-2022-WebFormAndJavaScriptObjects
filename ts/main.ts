class BabyProduct{
    productName: string;
    productPrice: number;
    productRating: string;
    expirationDate: string;
    isOnlineOnly: boolean;
}

// use count to prevent adding too much
var legendCount = 0; 
var productCount = 0;
var ulErrCount = 0;

window.onload = function(){
    let addBtn = <HTMLElement>getByID("addButton");
    //addBtn.onclick = addProduct;

    addBtn.addEventListener("click", clearErrMsg);
    addBtn.addEventListener("click", addProduct);

    // button clicked when 'Enter' key pressed
    // form reset and err msg cleared when 'ESC' key pressed
    specialKeyEventListener("product-name");
    specialKeyEventListener("product-price");
    specialKeyEventListener("expiration-date");
/*
    addBtn.onclick = () => {
        clearErrMsg();
        addProduct();
    }
*/
}

/**
 * execute functions when particular key entered
 * @param event of key pressed
 */
function specialKeyEventListener(id:string):void{
    let input = <HTMLInputElement>getByID(id);
    let addBtn = <HTMLElement>getByID("addButton");
    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keyup", function(event){
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            addBtn.click();
        }

        if (event.key === "Escape") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Reset the form
            (<HTMLFormElement>getByID("myForm")).reset();
            clearErrMsg();
        }
    });
}

/**
 * add product to database when all conditions are met
 */
function addProduct():void{
    addInputEventToClearErrors();
    if (isAllDataValid()){
        clearErrMsg();
        let product = getBabyProduct();
        productCount++;
        displayProduct(product);
        (<HTMLFormElement>getByID("myForm")).reset();
    }
}

/**
 * check validation of input data
 * @returns true if all data is valid
 */
function isAllDataValid():boolean{
    createErrorDisplay();
    addInputEventToClearErrors();
    let productName = getInputValueByID("product-name").trim();
    let productPrice = getInputValueByID("product-price").trim();
    let productRating = getInputValueByID("product-rating").trim();
    let expirationDate = getInputValueByID("expiration-date").trim();
    
    if ( productName !== "" 
        && productPrice !== "" 
        && !isNaN(parseFloat(productPrice)) 
        && parseFloat(productPrice) > 0 
        && productRating !== "Please choose a rating"
        && isValidDate(expirationDate)) {
        return true;
    }
    else{
        if (!isValidDate(expirationDate)){
            createErrLI("validationUL", "Format should be mm/dd/yyyy");
        }

        if (productRating == "Please choose a rating") {
            createErrLI("validationUL", "You must choose Product Rating");
        }

        if (productPrice == "") {
            createErrLI("validationUL", "Product Price can't be empty!");
        }
        else if (isNaN(parseFloat(productPrice)) || parseFloat(productPrice) <= 0){
            createErrLI("validationUL", "Product Price must be a valid number!");
        }

        if (productName == "") {
            createErrLI("validationUL", "Product Name can't be empty!");
        }

        return false;
    }
}

/**
 * short version of document.getElementById()
 * @param id of input textbox
 * @returns document.getElementById(id); 
 */
function getByID(id:string){
    return document.getElementById(id);
}

/**
 * short version of (<HTMLInputElement>document.getElementById()).value
 * @param id of input textbox
 * @returns value of input textbox
 */
function getInputValueByID(id:string){
    return (<HTMLInputElement>getByID(id)).value;
}

/**
 * get all Product data from the form
 * @returns in its BabyProduct objects
 */
function getBabyProduct():BabyProduct{
    // Create Product
    let product = new BabyProduct();

    // Populate with data from the form
    product.productName = getInputValueByID("product-name").trim();
    product.productPrice = parseFloat(getInputValueByID("product-price").trim());
    product.productRating = getInputValueByID("product-rating").trim();
    product.expirationDate = getInputValueByID("expiration-date").trim();

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
 * create ul to display error messages
 */
function createErrorDisplay():void{
    let validationDiv = getByID("error-div");
    while (ulErrCount == 0){
        // create and add ul list with product details 
        let createUL = document.createElement("ul");
        createUL.setAttribute("id", "validationUL");
        createUL.setAttribute("style", "color:red; margin-left: 100px;");

        validationDiv.appendChild(createUL);  
                
        ulErrCount++;
    }
}

/**
 * create error message line
 * @param id of validation ul
 * @param s message to display
 */
function createErrLI(id: string, s:string):void {
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(s);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
    getByID(id).insertBefore(createLI, getByID(id).children[0]);
}

/**
 * clear validation ul
 */
function clearErrMsg():void{
    getByID("validationUL").innerHTML = '';
}

/**
 * function that clears error messages user starts typing 
 */
 function addInputEventToClearErrors() {
    getByID("product-name").addEventListener("input", clearErrMsg);
    getByID("product-price").addEventListener("input", clearErrMsg);
    getByID("product-rating").addEventListener("input", clearErrMsg);
    getByID("expiration-date").addEventListener("input", clearErrMsg);
    
}

// display Product
function displayProduct(myProduct:BabyProduct):void{
    // create a fieldset to display products added
    createDisplayFrame();

    let displayDiv = getByID("display-div");

    // create and add ul list with product details 
    let ulID = "ul-" + productCount;  
    let createUL = document.createElement("ul");
    createUL.setAttribute("id", ulID);
    createUL.setAttribute("style", "color:blue; margin-left: 70px;");
    displayDiv.appendChild(createUL);
    
    // insert this product to top of display
    displayDiv.insertBefore(createUL, displayDiv.children[0]);

    let orderOptions = "online and in store.";
    if (myProduct.isOnlineOnly){
        orderOptions = "online only.";
    }

    let productCountStr = productCount.toString();

    createLI(ulID, "Product Sequence: ", productCountStr);
    createLI(ulID, "Product Name: ", myProduct.productName);
    createLI(ulID, "Product Price: $", myProduct.productPrice.toString());
    createLI(ulID, "Product Rating: ", myProduct.productRating);
    createLI(ulID, "Expiration Date: ", myProduct.expirationDate);
    createLI(ulID, "Product Available: ", orderOptions);
    createLI(ulID, "-----------------------", "-----------------------");
}

/**
 * create li line to display product info
 * @param id of ul of current product
 * @param a Title/Field such as Product Name
 * @param b name of specific product
 */
function createLI(id: string, a:string, b:string):void {
    let createLI = document.createElement("LI");
    let createLINote = document.createTextNode(a + b);
    createLI.appendChild(createLINote);
    getByID(id).appendChild(createLI);
}

/**
 * create fieldset to display products added,
 * the last one show on top of the list
 */
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