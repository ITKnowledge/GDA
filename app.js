var express = require('express');
var glob = require('glob');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');

var db = mongoose.connection;
db.on('error', function () {
throw new Error('unable to connect to database at ' + 'mongodb://localhost/mydb');
});

var models = glob.sync(path.normalize(__dirname + "/") + 'models/*.js');
models.forEach(function (model) {
require(model);
});

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'ui')));


// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./controllers/login')(passport);
app.use('/', routes);

// var suppliers = require('./controllers/suppliers');
// var employees = require('./controllers/employees');
// var teams = require('./controllers/teams');
// var clients = require('./controllers/clients');
// var engine = require('./controllers/engine');
// var caisse = require('./controllers/caisse');
// var ba = require('./controllers/ba');
// var bc = require('./controllers/bc');
//
//
//
//
//
// app.use('/suppliers', suppliers);
// app.use('/employees', employees);
// app.use('/teams', teams);
// app.use('/clients', clients);
// app.use('/engine', engine);
// app.use('/caisse', caisse);
// app.use('/ba', ba);
// app.use('/bc', bc);





// var controllers = [ '/Users/kbellioum/Desktop/Dev-projects/vueproject/controllers/index.js',
//   '/Users/kbellioum/Desktop/Dev-projects/vueproject/controllers/users.js' ];


var controllers = glob.sync(path.normalize(__dirname + "/") + 'controllers/*.js');

  controllers.forEach( function (controller) {

    var route = path.basename(controller).split('.')[0];

    // console.log(route);
    // console.log(controller);

    app.use((route == 'index')?'/':"/" + route, require(controller));

  });

// app.use(require('/Users/kbellioum/Desktop/Dev-projects/vueproject/controllers/index.js'));

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
