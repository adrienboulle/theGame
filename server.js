var express = require('express');
var logger = require('express-logger');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var userService = require('./user.service.js');
var auth = require('./authentification.js');

var app = express();

auth.config(app);

app.use(logger({path: __dirname + '/logfile.txt'}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

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

app.post('/api/login', auth.getStrategy(), function(req, res) {
	res.sendStatus(200);
});

app.get('/api/users', auth.hasHab(['ROLE_ADM']), function(req, res) {
	res.send({admin: true});
});

app.post('/api/signup', function(req, res) {
	userService.signupUser(req.body.username, req.body.password, req.body.passwordConfirmation, function(err, user){
		if(!err || err==null){
			res.sendStatus(200);
		}else{
			res.sendStatus(400, err);
		}
	});
});

app.all('/*', function(req, res) {
	res.sendFile('/public/index.html', { root: __dirname });
});

var port = process.env.PORT || 8085;

app.listen(port, function() {
	console.log('http://localhost:' + port)
});

exports.app = app;