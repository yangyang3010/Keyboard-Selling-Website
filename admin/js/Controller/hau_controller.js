import { model } from "../Model/hau_model.js";
import { view } from "../View/hau_view.js";
import { adminProductView } from "../View/hau_product.js";
import { adminAccountView } from "../View/hau_account.js";
import { adminOrderView } from  "../View/hau_order.js";
import { statitics } from "./huy_controller_statistic.js";

export const controller = {
    model, view,
    
    eventHandleChangeNavW(){
        let nav = document.getElementById('hau-admin-nav');
        nav.addEventListener("mouseover", ()=>{
            document.querySelectorAll(".hau-nav-button-content").forEach(item=>{
                item.style.display = "block"
            })
            document.documentElement.style.setProperty("--nav-width", "200px")
        })
        nav.addEventListener("mouseleave", ()=>{
            document.querySelectorAll(".hau-nav-button-content").forEach(item=>{
                item.style.display = "none"
            });

            document.documentElement.style.setProperty("--nav-width", "50px")
        })
        
    },
    eventHandelRemoveProduct(){
        document.querySelectorAll(".hau-func-delete-product").forEach( element => {
            element.addEventListener("click", (e)=>{
                if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")){
                    model.removeProduct(element.parentNode.parentNode.parentNode.dataset.id);
                    console.log(element.parentNode.parentNode.parentNode.dataset.id);
                    controller.showProductPage();
                }
            })
        })
    },
    eventHandleEditProduct(){
        document.querySelectorAll(".hau-func-edit-product").forEach(e=>{
            e.addEventListener("click",()=>{
                let nod = e.parentNode.parentNode.childNodes;
                let id = e.parentNode.parentNode.parentNode.dataset.id;
                let name = nod[1].value;
                let price = nod[5].value;
                let brand = nod[7].value;
                model.editProduct(id,name,price,brand);
                controller.showProductPage();
            })
        })
    },
    eventHandleAddproduct(){
        document.querySelector("#addbtn").addEventListener("click", () => {
            document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-none");
            console.log(document.querySelector(".huy-all-frame").classList);
            document.querySelector(".huy-all-frame").classList.remove("huy-close-all-frame");
            document.querySelector(".huy-container-info-pd").classList.remove("huy-container-info-pd-on");
            document.querySelector(".huy-container-info-pd").classList.add("huy-container-info-pd-on");
        });
    },
    eventHandleRemoveAccount(){
        document.querySelectorAll(".hau-func-delete-account").forEach(e => {
            e.addEventListener("click",()=>{
                if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")){
                    model.removeAccount(e.parentNode.parentNode.dataset.user);
                    console.log(e.parentNode.parentNode.dataset.user);
                    controller.showAccountPage();
                }
            });
        })
    },
    eventHandleShowProductImage(){
        document.querySelectorAll(".hau-product-image").forEach(element=>{
            element.addEventListener("click", ()=>{
                adminProductView.showProductImage(model.keyboards[element.parentElement.parentElement.dataset.id-1].img);
                controller.eventHandelRemoveProductImage();
            })
        })
    },
    eventHandelRemoveProductImage(){
        document.querySelectorAll(".hau-product-image-holder").forEach(element=>{
            element.addEventListener("click",()=>{
                element.remove();    
            })
        })
    },
    showProductPage() {
        document.getElementById("hau-content-page").innerHTML = `
            ${adminProductView.renderProductPageHeader("Product")}
            ${adminProductView.renderProductTable()}
        `;
        adminProductView.showProduct(model.keyboards);
        controller.eventHandleShowProductImage();
        controller.eventHandleAddproduct();
        controller.eventHandelRemoveProduct();
        controller.eventHandleEditProduct();
        
    },
    showAccountPage() {
        document.getElementById("hau-content-page").innerHTML = `
            ${adminAccountView.renderAccountPageHeader()}
            ${adminAccountView.renderAccountTable()}
            
        `;
        adminAccountView.showAccount(model.accounts);
        controller.eventHandleRemoveAccount();
    },
    showOrderPage() {
        document.getElementById("hau-content-page").innerHTML = `
            ${adminOrderView.renderOrderPageHeader("Order")}
            ${adminOrderView.renderOrderTable()}
            
        `;
        adminOrderView.showOrder(model.orders);
        controller.addHandlerOrderStateChange();
    },
    addHandlerOrderStateChange() {
        document.querySelectorAll(".hau-order-process-choice").forEach((element) => {
            element.addEventListener("change",()=>{
                model.processOrder(element.parentNode.parentNode.dataset.id,element.value);
                model.save();
            });
        });
    },
    eventHandleNav(){
        document.getElementById("productBtn").addEventListener("click", () => {
            controller.showProductPage();
            view.changeCurrentBtn(document.getElementById("productBtn"));
        });

        document.getElementById("orderBtn").addEventListener("click", () => {
            controller.showOrderPage();
            view.changeCurrentBtn(document.getElementById("orderBtn"));
        });

        document.getElementById("dashboardBtn").addEventListener("click", () => {

            statitics.init();
            view.changeCurrentBtn(document.getElementById("dashboardBtn"));
        });

        document.getElementById("accountBtn").addEventListener("click", () => {
            controller.showAccountPage();
            view.changeCurrentBtn(document.getElementById("accountBtn"));
        });

        document.getElementById("logout").addEventListener("click", () => {
            localStorage.setItem("currentaccounts",JSON.stringify(null));
            window.location.href = "/index.html";
        });
    },
    init() {
        view.init();
        controller.eventHandleNav();
        controller.eventHandleChangeNavW();
        statitics.init();
    }
}
