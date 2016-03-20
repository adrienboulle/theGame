'user strict'

var User = require('../models/user.js'),
	passportLocal = require('passport-local'),
	crypto = require('../utils/crypto.js');

module.exports = function(app, passport) {

	passport.use(new passportLocal.Strategy(verifyCredentials));

	// login ===================================================================

	// log in
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		res.sendStatus(200);
	});

	// get current user
	app.get('/api/login', function(req, res) {
		res.send({
			isAuthenticated: req.isAuthenticated(),
			user: (req.user) ? req.user : {}
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
			if (err) {
				res.sendStatus(400, err);
			} else {
				res.sendStatus(200);
			}
		});
	});

	// admin ==================================================================

	// ramène la liste des utilisateurs
	app.get('/api/users', hasRole(['ROLE_ADM']), function(req, res) {
		User.find({}, function(err, users) {
			if (err) {
				res.sendStatus(500, err);
			} else {
				res.send(users);
			}
		})
	});

	// acive/desactive des utilisateurs
	app.post('/api/users/actif', hasRole(['ROLE_ADM']), function(req, res) {
		User.find({'_id': { $in: req.body.ids}}, function(err, users) {
			if (err) {
				res.sendStatus(500, err);
			} else {
				for (var i = 0; i < users.length; i++) {
					var user = users[i];
					user.actif = req.body.actif;
					user.save(function(err) {
						if (err) {
							res.sendStatus(500);
						} else {
							res.sendStatus(200);
						}
					});
				}
			}
		})
	});

	// tout le reste
	app.all('/*', function(req, res) {
		res.sendFile('/public/index.html', { root: process.env.NODE_PATH });
	});

	// middleware
	function hasRole(roles) {
		return function hasRole(req, res, next) {
			if (req.isAuthenticated()) {
				User.findOne({_id: req.user._id}, function(err, user) {
					if (!err && user.hasRole(roles)) {
						return next();
					}
				})
			} else {
				return res.redirect('/');
			}
		}
	}

	function verifyCredentials(username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (!err && user) {
				user.verifyCredentials(password, function(err, passwordOk) {
					if (passwordOk && !err) {
						return done(null, user.toJson());
					} else {
						return done(err, null);
					}
				})
			} else {
				setTimeout(function() {
					return done('ERLOG404', null);
				}, 1000);
			}
		})
	}

	function signUp(userData, done) {
		if (userData.passwordConfirmation === userData.password && userData.password.length > 5){
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
								roles: ['ROLE_USER'],
								actif: false
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
