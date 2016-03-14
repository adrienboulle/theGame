var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	role: String
});

userSchema.methods.verifyCredentials = function(username, password, done) {
	this.findByUsername(username, function(err, user) {
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

userSchema.methods.hasHab = function(roles) {
	var succes = false;
	for (var i = 0; i < roles.length; i++) {
		if (req.user.role === roles[i]) {
			return true;
		}
	}
	return false;
} 

module.exports = mongoose.model('User', userSchema);