var express 		= require('express');
var app 			= express();
var port 			= process.env.PORT || 8085;
var mongoose 		= require('mongoose');
var passport 		= require('passport');

var logger 			= require('express-logger');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var expressSession 	= require('express-session');

var configDb 		= require('./config/database.js');

// configuration =============================================================
mongoose.connect(configDb.url);

app.use(logger({path: __dirname + '/logfile.txt'}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());	

// routes ====================================================================
require('./app/routes/routes.js')(app, passport);
require('./config/passport.js')(passport);

// launch ====================================================================
app.listen(port, function() {
	console.log('http://localhost:' + port)
});

exports.app = app;