const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { signIn, welcome, refresh } = require('./handlers');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', signIn);
app.get('/welcome', welcome);
app.post('/refresh', refresh);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});