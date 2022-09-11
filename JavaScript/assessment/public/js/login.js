// const axios = require('axios');

/**
 * login
 * @param {event} event 
 * @returns 
 */
function login(event) {
  event.preventDefault();
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");

  axios.post('./login-form-submit', {
    userName: userName.value,
    password: password.value
  })
  .then(function(res) {
    const data = res.data;
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location = data.redirect;
  })

  // if (userName.value == "currentID") {
  //   window.alert("Invalid ID");
  //   window.location.assign("register.html");
  //   return;
  // }

  // var localPwd = localStorage.getItem(userName.value);

  // if (localPwd && password.value == localPwd) {
  //   localStorage.setItem("currentID", userName.value);
  //   window.location.replace("assessment.html");
  // } else {
  //   window.alert("Account not found");
  //   window.location.assign("register.html");
  // }
}

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", login);