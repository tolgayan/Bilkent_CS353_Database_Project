const logger  = require( 'morgan');
const cookieParser = require( 'cookie-parser');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessions = require('express-session');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const homeRouter = require('./routes/home');
const createTaskPageRouter = require('./routes/createTaskPage');
const previousTasksPageClubsRouter = require('./routes/previousTasksPageClubs');
const accountRouter = require("./routes/account");
const newsRouter = require("./routes/news");
const addPostRouter = require("./routes/addpost"); 


var ejs = require('ejs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  secret: "sfd5gre5g636",
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/create_task', createTaskPageRouter);
app.use('/tasks', previousTasksPageClubsRouter);
app.use("/account", accountRouter);
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


module.exports = app
