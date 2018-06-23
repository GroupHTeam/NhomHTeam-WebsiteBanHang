var createError = require('http-errors');
var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var expressValidator=require('express-validator');
var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoStore = require('connect-mongo')(session);
var flash=require('connect-flash');
var settings=require('./config/settings');
var database=require('./config/database');
var indexRouter = require('./routes/index');
var catalog = require('./routes/catalog');  //Import routes for "catalog" area of site



var app = express();



mongoose.connect(database.dbStr);
mongoose.connection.on('error', function(err){
  console.log('Error connect to Database:' +err);
});
//require('./config/passport');

// view engine setup

var hbsConfig = expHbs.create({
  // helpers: require('./helpers/handlebars.js').helpers,
    layoutsDir: path.join(__dirname, '/templates/'+ settings.defaultTemplate+ '/layouts'),
    defaultLayout: path.join(__dirname, '/templates/'+ settings.defaultTemplate+ '/layouts/layout' ),
    partialsDir:  path.join(__dirname, '/templates/'+ settings.defaultTemplate+ '/partials' ),
    extname:'.hbs'
})




// Lấy đường dẫn tới các file hbs trong template
app.engine('.hbs', hbsConfig.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/templates/'+ settings.defaultTemplate));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'hanhkim', 
  resave: false, 
  key:'hanhkim',
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());


// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
//app.use('/users', users);
app.use('/catalog', catalog); 

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
