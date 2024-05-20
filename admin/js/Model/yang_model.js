export const model = {
    accountList : localStorage.getItem('accounts')?JSON.parse(localStorage.getItem('accounts')):[],
}