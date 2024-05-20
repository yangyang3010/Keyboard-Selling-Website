import {viewAddProduct} from './huy_view_add_product.js'

export const include = function include(filename){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = filename;
    script.defer = true;
    document.getElementsByTagName("head").item(0).appendChild(script);
}

include("./huy_model_add_product.js");
document.querySelector("body").innerHTML += viewAddProduct.renderProductInfo();