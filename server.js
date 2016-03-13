var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var auth = require('./authentification.js');

var passport = require('passport')
var passportLocal = require('passport-local')

var app = express();

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

passport.use(new passportLocal.Strategy(auth.verifyCredentials));

app.get('/api/login', function(req, res) {
	var user;
	if (req.user) {
		user = {
			username: req.user.username,
			role: req.user.role
		}
	} else {
		user = {}
	}

	res.send({
		isAuthenticated: req.isAuthenticated(),
		user: user
	});
});

app.delete('/api/login', function(req, res) {
	req.logout();
	res.sendStatus(200);
});

app.post('/api/login', passport.authenticate('local'), function(req, res) {
	res.sendStatus(200);
});

app.get('/api/users', auth.hasHab(['ROLE_ADM']), function(req, res) {
	res.send({admin: true});
});

app.all('/*', function(req, res) {
	res.sendFile('/public/index.html', { root: __dirname });
});

var port = process.env.PORT || 8085;

app.listen(port, function() {
	console.log('http://localhost:' + port)
});

exports.app = app;