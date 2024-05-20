import { productView } from '../js/hau-product-view.js'
import { model } from '../admin/js/Model/hau_model.js';
import { sellController } from '../js/hau_product_controller.js'
var counter = 1;
const icon = document.querySelector('.icon');
const search = document.querySelector('.search');

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 6000);

icon.onclick = function(){
    search.classList.toggle('active')
}

sellController.init();




