import { model } from "../Model/hau_model.js";

export const adminProductView = {
    renderProductTable(){
        return `
            <div class="hau-table" id="hau-product-table">
                ${this.renderProductHeader()}
            
            </div>
        `
    },
    renderProductPageHeader(content){
        return `
            <div>
                <h1>${content}</h1>
                <button class="hau-button" id="addbtn" ><i class="fa-solid fa-plus"></i></button>
            </div>
        `
    },
    renderProductHeader(){
        return `
            <div class="hau-product-header hau-table-header" id="hau-product-header">
                <label>Product</label>
                <label>Image</label>
                <label>Price</label>
                <label>Brand</label>
                <label>Option</label>
            </div>
        `
        // <label>Brand</label>
        //         <label>Led</label>
        //         <label>Color</label>
        //         <label>Switch</label>
        //         
    },
    renderProductItem(productData){
        let brandchoice = ""
        model.brands.forEach(b => {
            let brr = (String(productData.brand));
            if(brr.toUpperCase()==b.toUpperCase()){
                brandchoice += `<option selected value="${b}">${b}</option>}`
            }
            else{

                brandchoice += `<option value="${b}">${b}</option>}`
            }
        })
            
        return `
            <div class="hau-product-item hau-table-item" id="hau-product-item" data-id="${productData.id}">

                <div class="hau-product-teaser">
                    <input class="hau-product-info-table" type="text" value="${productData.name}">
                    <img class="hau-product-image" src="/imgs/DataKeyboard/${productData.img[0]}" alt="${productData.name}"/>
                    <input class="hau-product-info-table" type="text" value="${productData.price}">
                    <select class="hau-product-info-table">
                        ${brandchoice}
                    </select>
                    <div>
                        <button class="hau-button hau-func-delete-product">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="hau-button hau-func-edit-product">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>

                <div class="hau-product-detail">
                    <label><b>Wire</b><br>${productData.wires}</label>
                    <label><b>Led</b><br>${productData.led}</label>
                    <label><b>Color</b><br>${productData.color}</label>
                    <label><b>Switches</b><br>${productData.switches}</label>
                </div>
                    
            </div>
        `
    },
    showProductImage(imageList){
        let text = ''
        imageList.forEach((item)=>{
            text += `<img class="hau-product-image-item" src="/imgs/DataKeyboard/${item}">`
        })
        document.getElementById('section').innerHTML +=
        `
            <div class="hau-product-image-holder" id="c1">
                ${text}
            </div>
        `
    },
    showProduct(productList){
        productList.forEach(product => {
            document.getElementById("hau-product-table").innerHTML += adminProductView.renderProductItem(product);
        });
    }
}
