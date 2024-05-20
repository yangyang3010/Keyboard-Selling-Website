var email = document.querySelector('#email')
var phone = document.querySelector('#phone')
var username = document.querySelector('#username')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var submit = document.querySelector('#btn-signup')
var regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add('error')
    small.innerText = message
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.remove('error')
    small.innerText = ''
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()
        if (!input.value) {
            isEmptyError = true;
            showError(input, 'Không được để trống')
        } else {
            showSuccess(input)
        }
    });
    return isEmptyError
}

function checkEmailError(input) {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()
    let isEmailError = !regexEmail.test(input.value)
    if (regexEmail.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Email không hợp lệ')
    }
    return isEmailError
}

function checkPhoneError(input) {
    const regexPhoneNumber = /^([0|\+84]+[3|5|7|8|9])+([0-9]{8})\b$/;
    input.value = input.value.trim()
    let isPhoneError = !regexPhoneNumber.test(input.value)
    if (regexPhoneNumber.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Số điện thoại không hợp lệ')
    }
    return isPhoneError
}

function checkLengthError(input, min, max) {
    input.value = input.value.trim()
    if (input.value.length < min) {
        showError(input, `Phải có ít nhất ${min} kí tự`)
        return true
    }
    if (input.value.length > max) {
        showError(input, `Không được quá ${max} kí tự`)
        return true
    }
    return false
}

function checkMatchPasswordError(passwordInput, cfPasswordInput) {
    if (passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, 'Mật khẩu không trùng khớp')
        return true
    }
    return false        
}

submit.addEventListener('click', e => {
    e.preventDefault()
    console.log("hello")
    let isEmptyError = checkEmptyError([username, email, password, confirmPassword])
    let isEmailError = checkEmailError(email)
    let isPhoneError = checkPhoneError(phone);
    let isUsernameLengthError = checkLengthError(username, 6, 14)
    let isPasswordLengthError = checkLengthError(password, 6, 14)
    let isMatchError = checkMatchPasswordError(password, confirmPassword)
    let list = localStorage.getItem('accounts')?JSON.parse(localStorage.getItem('accounts')):[];
    // for (let i = 0; i < list.length; i++) {
    //     console.log(list[i]['email'])
    // }
    if (isEmailError == false && isEmptyError == false && isUsernameLengthError == false && isPasswordLengthError == false && isMatchError == false && isPhoneError == false) {
        let checkError = false;
        let list = localStorage.getItem('accounts')?JSON.parse(localStorage.getItem('accounts')):[];
        for (let i = 0; i < list.length; i++) {
            if (list[i]['email'] === email.value || list[i]['phone'] === phone.value || list[i]['username'] === username.value) {
                checkError = true;
                if (list[i]['email'] === email.value && list[i]['phone'] === phone.value && list[i]['username'] === username.value) {
                    showError(email,'Email đã được sử dụng')
                    showError(phone, 'Số điện thoại đã được sử dụng')
                    showError(username,'Tên đăng nhập đã được sử dụng')
                }
                else if (list[i]['email'] === email.value && list[i]['phone'] === phone.value) {
                    showError(email,'Email đã được sử dụng')
                    showError(phone, 'Số điện thoại đã được sử dụng')
                }
                else if (list[i]['email'] === email.value && list[i]['username'] === username.value) {
                    showError(email,'Email đã được sử dụng')
                    showError(username,'Tên đăng nhập đã được sử dụng')
                }
                else if (list[i]['phone'] === phone.value && list[i]['username'] === username.value) {
                    showError(phone, 'Số điện thoại đã được sử dụng')
                    showError(username,'Tên đăng nhập đã được sử dụng')
                }
                else if (list[i]['email'] === email.value) {
                    showError(email,'Email đã được sử dụng')
                }
                else if (list[i]['phone'] === phone.value) {
                    showError(phone, 'Số điện thoại đã được sử dụng')
                }
                else if (list[i]['username'] === username.value) {
                    showError(username,'Tên đăng nhập đã được sử dụng')
                }
                break;
            }
        }
        if (!checkError) {
            list.push({
                isAdmin: false,
                email: email.value,
                phone: phone.value,
                username: username.value,
                password: password.value,
                owner: document.getElementById("fullname").value,
                cart: [],
                history: []
            })
            localStorage.setItem('accounts', JSON.stringify(list));
            console.log(list) 
            console.log(localStorage.getItem('accounts'));
            email.value = ""
            phone.value = ""
            username.value = ""
            password.value = ""
            confirmPassword.value = ""
            alert("Đăng kí thành công!")
        }
    }
})