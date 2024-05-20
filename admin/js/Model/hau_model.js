import {keyboards as keyboardsTmp} from './data.js'
import {accounts as accountsTmp} from './data.js'
import {orders as orderTmp} from './data.js'


// let brands = 

export const model = {
    keyboards: localStorage.getItem('keyboards')?JSON.parse(localStorage.getItem('keyboards')):keyboardsTmp,
    brands: localStorage.getItem('brands')?JSON.parse(localStorage.getItem('brands')):["Logitech","Akko","DareU","IQUNIX","Leopold"],
    accounts: localStorage.getItem('accounts')?JSON.parse(localStorage.getItem('accounts')):accountsTmp,
    orders: localStorage.getItem('orders')?JSON.parse(localStorage.getItem('orders')):orderTmp,
    advanceSearch: function (name,minPrice,maxPrice,...brands) {
        return model.keyboards.filter( (keyboard) => 
            keyboard.name === name &&
            keyboard.price >= minPrice &&
            keyboard.price <= maxPrice &&
            brands.includes(keyboard.brand)
        )
    },
    processOrder(orderId, newState){
        model.orders.forEach(element =>{
            if(element.id == orderId){
                element.state = newState;
                return;
            }
        })
    },
    save(){
        localStorage.setItem('orders', JSON.stringify(model.orders));
        localStorage.setItem('keyboards', JSON.stringify(model.keyboards));
        localStorage.setItem('accounts', JSON.stringify(model.accounts));
        localStorage.setItem('brands', JSON.stringify(model.brands));
    },
    load(){
        // orders = JSON.parse(localStorage.getItem('orders'))
        console.log(orders.length)
        keyboards = JSON.parse(localStorage.getItem('keyboards'))
        accounts = JSON.parse(localStorage.getItem('accounts'))
    },
    removeProduct(productid){
        for(let i= 0; i < model.keyboards.length; i++){
            if(model.keyboards[i].id == productid){
                model.keyboards.splice(i, 1);
                
            }
        }
        model.save();
    },
    editProduct(id,name,price,brand){
        for(let i= 0; i < model.keyboards.length; i++){
            if(model.keyboards[i].id == id){
                model.keyboards[i].name = name;
                model.keyboards[i].price = price;
                model.keyboards[i].brand = brand;
            }
        }
        model.save();
    },
    removeAccount(username){
        for(let i= 0; i < model.accounts.length; i++){
            if(model.accounts[i].username == username){
                console.log(model.accounts.length)
                model.accounts.splice(i, 1);
                console.log(model.accounts.length)
                break;
            }
        }
        model.save();
    },
    addToCart(item,user){
        model.accounts.forEach(e=>{
            if(e.username == user.username){
                let flag = true;
                e.cart.forEach((itemIC)=>{
                    if(itemIC.id == Number(item)){
                        itemIC.qty += 1;
                        flag = false;
                    }
                });
                if(flag){
                    e.cart.push({id:item,qty:1});
                }
                localStorage.setItem("currentaccounts",JSON.stringify(e));
                model.save();
            }
        })
    },
    findProductById(id){
        let finder 
        model.keyboards.forEach(e =>{
            if(e.id == Number(id)){
                finder =  e;
            }
        })
        return finder;
    },
    addNewOrder(orderDetail){
        let nid = model.orders.sort((a,b)=>{
            return (a-b)/Math.abs(a-b);
        })[model.orders.length-1].id + 1;
        let ttp = 0;
        orderDetail.forEach(e =>{
            ttp += model.findProductById(e.id).price*e.qty;
        })
        let nod = {
            id: nid,
            date: new Date(),
            state: "non-process",
            totalPrice: ttp,
            detail: orderDetail
        }
        model.accounts.forEach(e => {
            if(e.username == JSON.parse(localStorage.getItem("currentaccounts")).username){
                e.history.push(nod);
                console.log(e);
            }
        })
        model.orders.push(nod);
        model.save();
    }
    
};
