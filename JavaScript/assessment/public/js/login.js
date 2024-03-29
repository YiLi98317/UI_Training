// import { checkToken } from './checkToken.js';

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
  .catch(function(error) {
    if(error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert(error.response.data.error.message);
    }
  })
}

// checkToken("assessment.html", "login.html");

const loginButton = document.getElementById("loginButton");


loginButton.addEventListener("click", login);


