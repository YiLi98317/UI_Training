/**
 * register
 * @param {event} event 
 * @returns 
 */
 function register(event) {
    const userName = document.getElementById("userName");
    const password = document.getElementById("password");

    if(userName.value =="currentID") {
        window.alert("Invalid ID");
        window.location.replace("register.html");
    }

    var validPattern = /^[A-Za-z0-9]+$/;
    if(userName.value.match(validPattern)) {
        localStorage.setItem(userName.value, password.value);
        localStorage.setItem("currentID", userName.value);
        window.location.replace("assessment.html");
    } else {
        window.alert("Invalid ID, only characters and digits allowed");
        window.location.replace("register.html");
    }
}

const registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", register);