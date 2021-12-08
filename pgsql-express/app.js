var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
const { Client } = require('pg');
const Query = require('pg').Query;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var client = new Client({
  user: 'postgres',
  host: '146.56.154.230',
  database: 'test',
  password: 'postgrespassword',
  port: 5432,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('success!');
  }
});

const query = new Query('SELECT t.*, CTID FROM schema.kud t LIMIT 501;');
client.query(query);
var rows = [];
query.on('row', (row) => {
  rows.push(row);
});
query.on('end', () => {
  console.log(rows);
  console.log('query done');
});
query.on('error', (err) => {
  console.error(err.stack);
});

app.listen(3000, () => {
  console.log('localhost:3000');
});
