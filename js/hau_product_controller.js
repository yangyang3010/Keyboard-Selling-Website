import { model } from "../admin/js/Model/hau_model.js";
import { productView } from "./hau-product-view.js";
import { renderProducts } from "./main.js";
import { renderPgn } from "./main.js";
import { handlePgn } from "./main.js";

export const sellController = {
    tempData: model.keyboards,
    tempBrand: "ALL",
    init(){
        // sellController.showProductSell(sellController.tempData,1);
        sellController.eventHandleSearch();
        sellController.eventHandleBrandFilter();
        sellController.eventHandleShowCart();
    },
    eventHandlePagination(){
        document.querySelectorAll('.hau-pagination').forEach(element => {
            element.addEventListener("click", ()=>{
                sellController.showProductSell(sellController.tempData,element.innerHTML);
            })
        });
    },
    eventHandleSearch(){
        document.getElementById("mysearch").addEventListener("input", () =>{
            sellController.search()
        });
    },
    search(){
        let text = document.getElementById("mysearch").value;
        sellController.tempData = model.keyboards
        sellController.tempData = sellController.tempBrand == "ALL"
            ?model.keyboards
            :model.keyboards.filter(
                (element)=>{
                    return element.brand.toUpperCase().includes(sellController.tempBrand.toUpperCase());
            })

        console.log(sellController.tempData)
        if (text != ""){
            sellController.tempData = sellController.tempData.filter((element)=>{
                return element.name.toUpperCase().includes(text.toUpperCase());
            })
        }
        
        // sellController.showProductSell(sellController.tempData,1);
        // // return sellController.tempData;
        // console.log(sellController.tempData)
        renderProducts(sellController.tempData);
        let NoPage = Math.ceil(sellController.tempData.length / 8)
        handlePgn(renderPgn(1,NoPage <= 5 ? NoPage : 5))
    },
    eventHandleBrandFilter(){
        document.querySelectorAll(".brand-menu-item").forEach((e)=>{
            e.addEventListener("click",()=>{
                document.querySelector(".current-brand").classList.remove("current-brand");
                e.classList.add("current-brand");
                sellController.tempBrand = e.childNodes[0].innerHTML;
                sellController.search();
            })
        })
    },
    eventHandleAddtoCart(){
        document.querySelectorAll(".add-to-cart-btn").forEach((e)=>{
            e.addEventListener("click",()=>{
                // 
                if(JSON.parse(localStorage.getItem("currentaccounts")=="null")){
                    alert("Vui lòng đăng nhập để mua hàng");
                }else{
                    // JSON.parse(localStorage.getItem("currentaccounts")).cart.push()
                    model.addToCart(e.parentNode.parentNode.parentNode.parentNode.dataset.id,
                        JSON.parse(localStorage.getItem("currentaccounts")))
                    alert("Thêm vào giỏ hàng thành công");   
                }
            });
        });
    },
    showProductSell(data,page){
        document.querySelector('.pagecontent').innerHTML = productView.renderProduct(data,page);
        sellController.eventHandlePagination();
        sellController.eventHandleAddtoCart();
    },
    showCart(){
        document.getElementById("modal").innerHTML = productView.renderCart();
        sellController.eventHandleCash();
        document.getElementById("cart-close-btn").addEventListener("click",()=>{
            document.getElementById("modal").innerHTML = ""
        })
    },
    eventHandleShowCart(){
        document.getElementById("show-cart-btn").addEventListener("click",()=>{
            sellController.showCart();
            document.getElementById("cart-close-btn").addEventListener("click",()=>{
                document.getElementById("modal").innerHTML = ""
            })
        })
    },
    eventHandleCash(){
        document.getElementById("cart-check-buy-btn").addEventListener("click",()=>{
            let odlist = []
            document.querySelectorAll(".buy-checker").forEach(element =>{
                if(element.checked){
                    console.log(element.parentNode.parentNode.childNodes[5].childNodes[1].value)
                    odlist.push({
                        id:element.parentNode.parentNode.dataset.id,
                        qty:element.parentNode.parentNode.childNodes[5].childNodes[1].value
                    })
                    
                    sellController.removeFromCart(element.parentNode.parentNode.dataset.id);
                }
                
            })
            if (confirm("Bạn có chắc muốn thanh toán không ?")) {
              model.addNewOrder(odlist);
              alert("Thanh toán thành công.")
            }
        })
    },
    removeFromCart(id){
        model.accounts.forEach(e=>{
            if(e.username == JSON.parse(localStorage.getItem("currentaccounts")).username){
                for(let ix = 0; ix<e.cart.length; ix++){
                    if(e.cart[ix].id == id){
                        e.cart.splice(ix,1)
                        console.log(e)
                    }
                }
                localStorage.setItem("currentaccounts",JSON.stringify(e));
                sellController.showCart();
            }
        })
    }
}