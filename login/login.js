function login() {
    event.preventDefault();

    var localPwd = localStorage.getItem(id.value);

    if(localPwd != null && password.value == localPwd) {
        localStorage.setItem("currentID", id.value);
        window.location.replace("hello.html");
        return true;
    } else {
        window.location.replace("register.html");
        return false;
    }
}

const id = document.getElementById("id");
const password = document.getElementById("password");
const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", login);