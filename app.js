const logger  = require( 'morgan');
const cookieParser = require( 'cookie-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const offersRouter = require('./routes/offers');
const tasksRouter = require('./routes/tasks');
const sessions = require('express-session');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const footballerRouter = require('./routes/footballer');
const tasks = require('./routes/tasks')
const reportRouter = require('./routes/report');
const bodyParser = require('body-parser');
const accountRouter = require("./routes/account");
const newsRouter = require("./routes/news");
const addPostRouter = require("./routes/addpost");
const scoutRouter = require("./routes/assign_scout");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// create application/x-www-form-urlencoded parser
//app.use( bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(bodyParser.text({ type: "text/plain", extended:true}));
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  secret: "sfd5gre5g636",
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/tasks', tasksRouter);
app.use('/offers', offersRouter);
app.use('/footballer', footballerRouter);
app.use('/tasks', tasks);
app.use('/report', reportRouter);
app.use("/account", accountRouter);
app.use("/assign_scout", scoutRouter);
app.use("/news", newsRouter);
app.use("/news/addpost", addPostRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.message);
});

module.exports = app;
