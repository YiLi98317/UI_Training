const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rootDir = "/Users/liyi/Desktop/Work/UI_Training/JavaScript/assessment/";
const publicDir = rootDir + "public/";

const { signIn, welcome, refresh, storeJWT, testPOST, start, checkToken } = require('./handlers');

const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// handle API
app.get('/', function (req, res) {
    res.sendFile(publicDir + 'login.html');
  });
app.use(express.static(publicDir));
app.post('/check-token', checkToken); // check token
app.post('/login-form-submit', signIn); //login form
// app.get('/login-form-submit', storeJWT);

app.post('/test', testPOST);

// assessment form


app.get('/welcome', welcome);
app.post('/refresh', refresh);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});