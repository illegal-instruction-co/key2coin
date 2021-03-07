/*
  Http server
*/
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()

const config = require("./config")

/*
  Modular functions
*/
const Log = require('./functions/log')

/*
  Fuck that cors thing
*/
var cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        '*'
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

/*
  Get middlewares
*/

// Admin auth middleware
const userAuthMiddleWare = require('./middlewares/user-auth')

/*
  Activate bodyparser
  json & urlencoded
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
  Routes
*/
app.use('/', require('./routes/index'));
app.use('/24h', require('./routes/24h'));
app.use('/hourly', require('./routes/hourly'));
app.use('/supported', require('./routes/supported'));
app.use('/auth', require('./routes/auth'));

require("./routes/languages")(app, userAuthMiddleWare)
require("./routes/translates")(app, userAuthMiddleWare)
require("./routes/sales")(app, userAuthMiddleWare)
require("./routes/redeems")(app, userAuthMiddleWare)
require("./routes/users")(app, userAuthMiddleWare)
require("./routes/parameters")(app, userAuthMiddleWare)

/*
  Catch 404 and forward to error handler
*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
  Error handlers
*/

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {

    Log(config.basis.error_log_prefix, err)

    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

  Log(config.basis.error_log_prefix, err)

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
