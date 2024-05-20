import { model } from "../Model/hau_model.js"
export const adminOrderView = {
    renderOrderPageHeader(content){
        return `
            <div>
                <h1>${content}</h1>
            </div>
        `
    },
    renderOrderTable(){
        return `
        <div class="hau-table" id="hau-order-table">
            ${adminOrderView.renderOrderHeader()}
    
        </div>
        `
        
           
        
    },
    renderOrderNav(){
        return `
        <input type="radio" id="hau-order-nav-all" class="hau-order-nav" name="OrderState" value="all" />
        <label for="hau-order-nav-all">ALl</label>
        <input type="radio" id="hau-order-nav-nonprocess" class="hau-order-nav" name="OrderState" value="all" />
        <label for="hau-order-nav-nonprocess">Non-Process</label>
        <input type="radio" id="hau-order-nav-processed" class="hau-order-nav" name="OrderState" value="all" />
        <label for="hau-order-nav-processed">Processed</label
        `
    },
    renderAllOrder(){

    },
    renderNonProcessOrder(){

    },
    renderProcessedOrder(){

    },
    renderOrderHeader(){
        return `
        <div class="hau-order-header hau-table-header" id="hau-order-header">
            <label>date</label>
            <label>state</label>
            <label>totalprice</label>
        </div>
        `
    },
    renderOrderItem(order){
        let text = ""
        order.detail.forEach(e=>{
            let pr = model.findProductById(e.id);
            text += `
                <div class="hau-order-detail">
                    <label>Name: ${pr.name}</label>
                    <label>Brand: ${pr.brand}</label>
                    <label>Price: ${pr.price}</label>
                    <label>Quantity: ${e.qty}</label>
                </div>
            `
        })
        return `
        <div class="hau-order-holder">
            <div class="hau-order-item hau-table-item" data-id=${order.id}>
                <label>${new Date(order.date).toLocaleString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                <div>
                    <select class="hau-order-process-choice" name="process" id="hau-order-process">
                        <option class="hau-order-process-option-process" value="process" ${order.state=="process"?"selected":""}>Done</option>
                        <option class="hau-order-process-option-reject" value="reject" ${order.state=="reject"?"selected":""}>Reject</option>
                        <option class="hau-order-process-option-non-process" value="non-process" ${order.state=="non-process"?"selected":""}>Non-Process</option>
                    </select>
                </div>
                <label>${order.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</label>
            </div>
            <div class="hau-order-detail-container">
                ${text}
            </div>
        </div>
        `
    },
    showOrder(orderList){
        orderList.forEach(order => {
            document.getElementById("hau-order-table").innerHTML += adminOrderView.renderOrderItem(order);
        });
    }
}