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

window.onload = function(){
    let addBtn = <HTMLElement>document.getElementById("addButton");
    addBtn.onclick = addProduct;
}

function addProduct(){
    if (isAllDataValid()){
        let product = getBabyProduct();
        displayProduct(product);
    }
}

// display Product
function displayProduct(myProduct:BabyProduct):void{
    // TO DO: Display Product below the form
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
    product.expirationDate = getValidDate("product-date");

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