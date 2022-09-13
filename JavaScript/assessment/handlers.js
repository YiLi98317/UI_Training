const jwt = require('jsonwebtoken')

const jwtKey = 'assessmentProject';
const jwtExpirySeconds = 60*60*2; // 2 hours 10 sec as test

const rootDir = "/Users/liyi/Desktop/Work/UI_Training/JavaScript/assessment/";
const publicDir = rootDir + "public/";

// should be replaced by APIs getting the cridencial
const users = {
  'yi': 'yi',
  'yi@gmail.com': 'yi123',
  'testUsr': 'testPwd'
}

const signIn = (req, res) => {
  console.log("sign in...");
  // console.log("res: ", res);
  console.log("req.body: ", req.body);
  // Get credentials from JSON body
  const { userName, password } = req.body;
  console.log("userName: ", userName);
  console.log("password: ", password);

  if (!userName || !password || users[userName] !== password) {
    // return 401 error is username or password doesn't exist, or if password does
    // not match the password in our records
    console.log("error, account not found");
    var response = {
      redirect: "register.html",
      token: ""
    }
    return res.json(response);
    // res.redirect('register.html');
    // return false;
    // res.status(401).end();
  }

  // prevent bad access using localstorage
  if (userName == "currentID") {
    window.alert("Invalid ID");
    window.location.replace("register.html");
    return;
  }

// Create a new token with the username in the payload
  // and which expires 300 seconds after issue
  const token = jwt.sign({ userName }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  console.log('token:', token);

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
  var response = {
    redirect: "assessment.html",
    token: token
  }
  // res.redirect("/assessment.html?valid=" + string);
  // res.send(res.body);
  return res.json(response);
  // return true;
}

const welcome = (req, res) => {
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end()
    }
    // otherwise, return a bad request error
    return res.status(400).end()
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  res.send(`Welcome ${payload.username}!`);
  console.log("user login: ", payload.username);
}

const refresh = (req, res) => {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const token = req.cookies.token

  if (!token) {
    return res.status(401).end()
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })
  console.log("new token: ", newToken);

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
}

const storeJWT = function(req, res) {
  console.log(req.body);
};

const testPOST = function(req, res) {
  console.log("test POST");
  console.log(req.body);
  const { userName, password } = req.body;
  console.log("userName: ", userName);
  console.log("password: ", password);

  res.send(req.body);
};

const start = function (req, res) {
  res.sendFile(publicDir + 'login.html');
};

const checkToken = function (req, res) {
  console.log("check token...");
  console.log("req.body: ", req.body);
  const {token} = req.body;

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch(e) {
    console.log("server side, token not verified: token expired");
    return res.json({
      status: "0"
    });
  }

  console.log("token verified");
  return res.json({
    status: "1"
  })
};

module.exports = {
  signIn,
  welcome,
  refresh,
  storeJWT,
  testPOST,
  start,
  checkToken
}