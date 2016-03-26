var User = require('../app/models/user.js');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User
			.findOne({_id:id})
			.populate('roles')
			.exec(function(err, user) {
				done(err, user.toJson());
		})
	});

}