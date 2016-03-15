'user strict'

var express 		= require('express'),
	app 			= express(),
	port 			= process.env.PORT || 8085,
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),

	logger 			= require('express-logger'),
	bodyParser 		= require('body-parser'),
	cookieParser 	= require('cookie-parser'),
	expressSession 	= require('express-session'),

	configDb 		= require('./config/database.js');

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