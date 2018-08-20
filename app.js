var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 添加session模块 并使用
//  npm install --save ejs-mate
var engine = require('ejs-mate');
var session = require('express-session')
var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var teachersRouter = require('./routes/teachers');

var app = express();
app.engine('ejs',engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  secret: 'stu-manage',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge: 1000 * 60 *60 *3 }

}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/students',studentsRouter);
app.use('/teachers',teachersRouter);

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
  res.render('error');
});

module.exports = app;
