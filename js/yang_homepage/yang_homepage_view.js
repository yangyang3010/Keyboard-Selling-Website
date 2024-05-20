export const homepageView = {
    renderHomepage() {
        return `
        ${this.renderNavbar()}
        ${this.renderContent()}
        `
    },
    renderNavbar() {
        return `
        <div class="navbar">
            <div class="navbar-logo">
                <img src="">
            </div>
            <div class="navbar-search">
                <input type="text" class="navbar-search-bar" placeholder="Type to search">
                <button class="navbar-search-btn">search</button>
            </div>
            <ul class="nav-menu>
                <li class="nav-item" id="nav-item-home">Trang chủ</li>
                <li class="nav-item" id="nav-item-signup">Đăng kí</li>
                <li class="nav-item" id="nav-item-signin">Đăng nhập</li>
                <li class="nav-item" id="nav-item-cart">Giỏ hàng</li>
            </ul>
        </div>
        `
    },
    renderContent() {
        return `
            <div class="page-content" id="homepage-content"></div>
        `
    }
}