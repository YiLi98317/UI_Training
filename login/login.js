function login(event) {
    const userName = document.getElementById("userName");
    const password = document.getElementById("password");

    if(userName.value =="currentID") {
        window.alert("Invalid ID");
        window.location.replace("register.html");
    }

    var localPwd = localStorage.getItem(userName.value);

    if(localPwd && password.value == localPwd) {
        localStorage.setItem("currentID", userName.value);
        window.location.replace("hello.html");
    } else {
        window.alert("Account not found");
        window.location.replace("register.html");
    }
}

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", login);