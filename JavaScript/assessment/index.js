// load dependency
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createHttpError = require('http-errors');
const Validator = require('./middlewares/Validator')

const rootDir = "/Users/liyi/Desktop/Work/UI_Training/JavaScript/assessment/";
const publicDir = rootDir + "public/";
const { signIn, welcome, refresh, storeJWT, testPOST, start, checkToken } = require('./handlers');

const app = express();

//* Routes
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

//* Application Level Middlewares
//* Parse JSON body
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//* Bind Routes
app.use('/auth', authRouter)
app.use('/posts', postRouter)

// handle API
app.get('/', function (req, res) {
    res.sendFile(publicDir + 'login.html');
  });
app.use(express.static(publicDir));
app.post('/check-token', checkToken); // check token
app.post('/login-form-submit', Validator('login'), signIn); //login form , 
app.post('/test', testPOST); // a test endpoint

// unused API
app.get('/welcome', welcome);
app.post('/refresh', refresh);

//* Catch HTTP 404 
app.use((req, res, next) => {
  next(createHttpError(404));
})

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          status: err.status || 500,
          message: err.message
      }
  })
});

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});