function register() {
    event.preventDefault();

    localStorage.setItem(id.value, password.value);
    localStorage.setItem("currentID", id.value);
    window.location.replace("hello.html");
}

const id = document.getElementById("id");
const password = document.getElementById("password");
const form = document.getElementById("form");
const error = document.getElementById("error");

form.addEventListener("submit", register);