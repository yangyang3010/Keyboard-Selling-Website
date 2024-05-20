export const adminAccountView = {
    renderAccountPageHeader() {
        return `
            <div>
                <h1>Account</h1>
            </div>
        `
    },
    renderAccountTable(){
        return `
        <div class="hau-table" id="hau-account-table">
            ${this.renderAccountTableHeader()}
        
        </div>
    `
    },
    renderAccountTableHeader(){
        return `
            <div class="hau-account-header hau-table-header" id="hau-account-header">
                <label>username</label>
                <label>password</label>
                <label>owner name</label>
                <label>phone</label>
                <label>email</label>
                <label>Option</label>
            </div>
        `
    },
    renderAccountTableItem(account){
        return `
            <div class="hau-account-item hau-table-item" id="hau-account-item" data-user="${account.username}">
                <label>${account.username}</label>
                <label>${account.password}</label>
                <label>${account.owner}</label>
                <label>${account.phone}</label>
                <label>${account.email}</label>
                <div>
                    <button class="hau-button hau-func-delete-account">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `
    },
    showAccount(accountList){
        accountList.forEach(account => {
            document.getElementById("hau-account-table").innerHTML += adminAccountView.renderAccountTableItem(account);
        });
    }
}