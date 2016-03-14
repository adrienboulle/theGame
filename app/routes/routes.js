var User = require('../models/user.js');
var passportLocal = require('passport-local');
var crypto = require('../utils/crypto.js')

module.exports = function(app, passport) {

	passport.use(new passportLocal.Strategy(verifyCredentials));

	// login ===================================================================

	// log in
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		res.sendStatus(200);
	});

	// get current user
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

	// logout
	app.delete('/api/login', function(req, res) {
		req.logout();
		res.sendStatus(200);
	});

	// sign up
	app.post('/api/signup', function(req, res) {
		var user = {
			username: req.body.username,
			password: req.body.password,
			passwordConfirmation: req.body.passwordConfirmation
		}

		signUp(user, function(err, user){
			if(err){
				res.sendStatus(400, err);
			}else{
				res.sendStatus(200);
			}
		});
	});

	// admin ==================================================================

	// test pour hab ROLE_ADMIN
	app.get('/api/users', hasRole(['ROLE_ADM']), function(req, res) {
		res.send({admin: true});
	});

	// tout le reste
	app.all('/*', function(req, res) {
		res.sendFile('/public/index.html', { root: process.env.NODE_PATH });
	});

	// middleware
	function hasRole(roles) {
		return function hasHab(req, res, next) {
			if (!req.isAuthenticated()) {
				return res.redirect('/');
			} else if (!roles) {
				return next();
			} else {
				for (var i = 0; i < roles.length; i++) {
					if (req.user.role === roles[i]) {
						return next();
					}
				}
			}
			return res.redirect('/');
		}
	}

	function verifyCredentials(username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {
				setTimeout(function() {
					done(err, null);
				}, 1000);
			} else if (user) {
				var combined = new Buffer(user._doc.password, 'base64');
				crypto.verifyPassword(password, combined, function(err, loggedIn) {
					if (err) done(err, null);
					if (loggedIn) {
						done(null, {_id:user._doc._id.toString(), name: user._doc.username, role: user._doc.role});
					} else {
						done(null, null);
					}
				})
			} else {
				setTimeout(function() {
					done(null, null);
				}, 1000);
			}
		})
	}

	function signUp(userData, done) {
		if(userData.passwordConfirmation === userData.password && userData.password.length>5){
			User.findOne({username: userData.username}, function(err, user) {
				if (user) {
					done("Nom d'utilisateur déjà utilisé");
				} else {
					crypto.hashPassword(userData.password, function(err, hash) {
						if (err) {
							callback(err);
						} else {
							var user = new User({
								username: userData.username,
								password: hash.toString('base64'),
								role: 'ROLE_USER'
							});
							user.save(function(err, user) {
								done(err, user);	
							});
						}
					})
				}
			})
		} else if (userData.passwordConfirmation != userData.password){
			done("Les mot de passes ne sont pas identiques");
		} else if (password.length <= 5){
			done("Mot de passe trop petit, veuillez utiliser 6 caractères au minimun");
		}
	}
}

