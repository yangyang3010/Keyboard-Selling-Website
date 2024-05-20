import {viewAddProduct} from './../View/huy_view_add_product.js'
function include(filename){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = filename;
    script.defer = true;
    document.getElementsByTagName("head").item(0).appendChild(script);
}
include("./js/Model/huy_model_add_product.js");
document.querySelector("body").innerHTML += viewAddProduct.renderProductInfo();