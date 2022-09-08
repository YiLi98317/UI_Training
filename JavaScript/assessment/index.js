const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rootDir = "/Users/liyi/Desktop/Work/UI_Training/JavaScript/assessment/";
const publicDir = rootDir + "src/public/";

const { signIn, welcome, refresh } = require('./handlers');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.sendFile(publicDir + 'login.html');
});
app.use(express.static(publicDir));

app.post('/signin', signIn);
app.get('/welcome', welcome);
app.post('/refresh', refresh);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});