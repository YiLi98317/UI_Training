function login(event) {
event.preventDefault();
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");

  axios.post('./test', {
    userName: userName.value,
    password: password.value
  });
}

const loginButton = document.getElementById("sub");

loginButton.addEventListener("click", login);