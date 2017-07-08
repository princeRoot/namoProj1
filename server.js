    var express  = require('express');
var app      = express();
//app.use(express.static('public'));
//var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
//var flash    = require('connect-flash');

var morgan       = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
//var session      = require('express-session');
var parseurl     = require('parseurl');

//notification schema
// var Notification  = require('./app/models/notification.js');
// var Advertisement  = require('./app/models/advertisement.js');
// var User  = require('./app/models/advertisement.js');


//added for file sharing
var formidable = require('formidable');
var path = require('path');     //used for file path
//var fs =require('fs-extra');    //File System-needed for renaming file etc

app.use(express.static(path.join(__dirname, 'public')));
//var Question       = require('../app/models/question');



//app.use(express.static(__dirname + '/public'));

//app.use('/static', express.static(__dirname + '/public'));



//database connection
var configDB = require('./config/database.js');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

////////////////////////
        


// setting view count
//app.use(function(req, res, next){
//  var views = req.session.views;
//  if(!views){
//    views = req.session.views = {};
//  }
//  var pathname = parseurl(req).pathname;
//    
//  views[pathname] = (views[pathname] || 0) + 1;
//
//  next();
//
//});

// set up our express application
app.use(morgan('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)
app.use(require('body-parser').urlencoded({extended: true}));  // get information from html forms

var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

//var credentials = require('./credentials.js');
    //app.use(require('cookie-parser')(credentials.cookieSecret));
//app.use(session({
//  resave: true,
//  saveUninitialized: true,
//  secret: credentials.cookieSecret,
    secret: "sudeepanadeeshan",
//}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//app.use(flash()); // use connect-flash for flash messages stored in session
//require('./config/passport.js')(passport);

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//app.listen(port);
//console.log('The magic happens on port ' + port);


//noti
//User notification

var server = require('http').Server(app);
//var io = require('socket.io')(server);



app.set('port', process.env.PORT || 3000);


server.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});



