require('dotenv').config();

const { Nuxt, Builder } = require('nuxt');
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isProd = (process.env.NODE_ENV === 'production');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI);

const axios = require('axios');
axios.defaults.baseURL = process.env.APP_HOST;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

let config = require('../nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

// すべてのルートを Nuxt.js でレンダリングする
app.use(nuxt.render);

// ホットリローディングする開発モードのときのみビルドする
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
