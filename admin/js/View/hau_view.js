export const view = {
    renderPage(){
        return `
            <div class="hau-bg1" id="hau-page"></div>
        `
    },
    renderNav(){
        return `
            <div class="hau-nav" id="hau-admin-nav">
                <div class="hau-nav-logo">
                    <img src="../../../imgs/logo-keyboard-center.png">
                </div>
                <div class="hau-nav-button-holder">
                    <div class="hau-nav-button" id="dashboardBtn">
                        <i class="fa-solid fa-bars"></i>
                        <div class="hau-nav-button-content"">Dashboard</div>
                    </div>
                    <div class="hau-nav-button" id="productBtn">
                        <i class="fa-solid fa-keyboard"></i>
                        <div class="hau-nav-button-content">Product</div>
                    </div>
                    <div class="hau-nav-button" id="orderBtn">
                        <i class="fa-solid fa-list"></i>
                        <div class="hau-nav-button-content">Order</div>
                    </div>
                    <div class="hau-nav-button" id="accountBtn">
                        <i class="fa-solid fa-user"></i>
                        <div class="hau-nav-button-content">Account</div>
                    </div>
                    <div class="hau-nav-button-animation"></div>
                </div>
                <div class="hau-nav-button" id="logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <div class="hau-nav-button-content">Logout</div>
                </div>
            </div>
        `
    },
    changeCurrentBtn(btn){
        let current = document.querySelector('.hau-current-btn');
        if (current != null) {
            current.classList.remove('hau-current-btn');
        }
        btn.classList.add('hau-current-btn');
    },
    renderContent(){
        return `
        <div class="hau-content-page" id="hau-content-page">
        
        </div>
        `
    },
    init(){
        document.getElementById("root").innerHTML = this.renderPage();
        document.getElementById("hau-page").innerHTML = this.renderNav();
        document.getElementById("hau-page").innerHTML += this.renderContent();
    }
}

