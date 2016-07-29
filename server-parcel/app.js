// modules ===========================================
//var newrelic = require('newrelic');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/dist/public/favicon.ico'));
app.use(logger('dev'));

// parse application/vnd.api+json as json ( Might not need to include)
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded ( Might need to change back to false)
app.use(bodyParser.urlencoded({ extended: true }));

// override the X-HTTP-Method-Override header in the request.
//simulate DELETE/PUT ( Might not need this anyways)
// app.use(methodOverride('X-HTTP-Method-Override'));

app.use(cookieParser());
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//Auth Middleware - This will check if the token is valid
//Only the requests that start with /api/v1/* will be checked for the token.
//Any URL's that do not follow the below pattern should be avoided unless you
//are sure that authentication is not needed
// app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

/**
* Development Settings
*/
// will print stacktrace
// if (app.get('env') === 'development') {
//   // This will change in production since we'll be using the dist folder
//   app.use(express.static(path.join(__dirname, '../client')));
//   // This covers serving up the index page
//   app.use(express.static(path.join(__dirname, '../client/.tmp')));
//   app.use(express.static(path.join(__dirname, '../client/app')));
//
//   // Error Handling
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

/**
* Production Settings
*/
if (app.get('env') === 'production') {
  // changes it to use the optimized version for production
  //app.use(express.static(path.join(__dirname, '/dist/')));
  // production error handler
  // no stacktraces leaked to user
  console.log('were in production')
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
  });
}

/**
 * Routes
*/
var router = require('./router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
