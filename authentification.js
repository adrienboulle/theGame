var cryptoPassword = require('./crypto.password.js');

var passport = require('passport')
var passportLocal = require('passport-local')

var userService = require('./user.service.js');

function verifyCredentials(username, password, done) {
	userService.findByUsername(username, function(err, user) {
		if (err || err != null) {
			done(err, null);
		} else if (user) {
			var combined = new Buffer(user.password, 'base64');
			cryptoPassword.verifyPassword(password, combined, function(err, loggedIn) {
				if (err) done(err, null);
				if (loggedIn) {
					done(null, {_id:user._id.toString(), name: user.username, role: user.role});
				} else {
					done(null, null);
				}
			})
		} else {
			done(null, null);
		}
	})
}

function hasHab(roles) {
	return function(req, res, next) {
		var succes = false;
		if (req.isAuthenticated()) {	
			if (!roles) {
				next();
				succes = true;
			} else {
				for (var i = 0; i < roles.length; i++) {
					if (req.user.role === roles[i]) {
						next();
						succes = true;
					}
				}
			}
			if (!succes) res.sendStatus(403);
		} else {
			res.sendStatus(403);
		}
	}
}

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	userService.findById(id, function(err, user) {
		if (err || err != null) {
			done(null, null);
		} else {
			done(null, user);
		}
	})
});

exports.hasHab = hasHab;
exports.verifyCredentials = verifyCredentials;