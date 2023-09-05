const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Configure Google OAuth user session
app.use(
  session({
    secret: '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',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://tomsears90:NTryYQCLLgdtNH6F@cluster0.41oubkj.mongodb.net/trackTrack?retryWrites=true&w=majority',
      mongooseConnection: mongoose.connection,
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set the user in response locals
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

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
