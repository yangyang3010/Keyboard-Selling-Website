import { view } from '../View/yang_view.js'
import { model } from '../Model/yang_model.js'

export const loginController = {
    view, model,
    showSigninForm() {
        document.getElementById('form').innerHTML = view.renderLoginForm();

        var submitLog = document.querySelector('.btn-submit-log')
        var username = document.querySelector('#username')
        var password = document.querySelector('#password')
        var signinBtn = document.querySelector('#btn-signin');
        signinBtn.addEventListener('click', (e) => {
            loginController.showSignupForm();
        })

        submitLog.addEventListener('click', e => {
            e.preventDefault()
            let isEmptyError = this.checkEmptyError([username, password])
            let list = model.accountList;
            if (isEmptyError == false) {
                // let checkLog = false;
                let tmp = this.checkSignin([username, password]);
                if (tmp != null) {
                    window.location.href = "/index.html";
                    localStorage.setItem('currentaccounts', JSON.stringify(tmp));
                    console.log('true')
                }
                else {
                    this.showError(username, 'Thông tin đăng nhập không hợp lệ');
                    console.log('false')
                }
            }
        })
        document.querySelector("#btn-change").addEventListener("change", (e) => {
            e.preventDefault();
            loginController.showPassword();
        })
    },
    showError(input, message) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.add('error')
        small.innerText = message
    },
    showSuccess(input) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.remove('error')
        small.innerText = ''
    },
    checkEmptyError(listInput) {
        let isEmptyError = false;
        listInput.forEach(input => {
            input.value = input.value.trim()
            if (!input.value) {
                isEmptyError = true;
                this.showError(input, 'Không được để trống')
            } else {
                this.showSuccess(input)
            }
        });
        return isEmptyError
    },
    checkSignin([username, password]) {
        let list = localStorage.getItem('accounts') ? JSON.parse(localStorage.getItem('accounts')) : [];
        for (let i = 0; i < list.length; i++) {
            if (list[i]['username'] === username.value && list[i]['password'] === password.value) {
                return list[i];
            }
        }
        return null;
    },
    showSignupForm() {
        document.getElementById('form').innerHTML = "";
        document.getElementById('form').innerHTML = view.renderRegistrationForm();
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/js/app.js";
        script.defer = true;
        document.getElementById("form").appendChild(script);


        let btnsignup = document.getElementById('btn-signup');
        let btnsignin = document.getElementById('btn-signin');
        btnsignup.addEventListener('click', e => {
            e.preventDefault();
        })
        btnsignin.addEventListener('click', e => {
            e.preventDefault();
            loginController.showSigninForm();
        })

    },
    showPassword() {
        document.querySelector("#password").type = document.querySelector("#btn-change").checked ? "text" : "password";
    }
}