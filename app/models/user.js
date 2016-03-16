'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	crypto   = require('../utils/crypto.js');

var UserSchema = new Schema({
	username: String,
	password: String,
	role: String,
	roles: [String]
});

UserSchema.methods.verifyCredentials = function(password, callback) {
	var combined = new Buffer(this.password, 'base64');
	crypto.verifyPassword(password, combined, function(err, loggedIn) {
		return callback(err, loggedIn);
	})
}

UserSchema.methods.hasRole = function(roles) {
	if (!roles) {
		throw 'hasHab function take an array in parameter'
	} else {
		for (var i = 0; i < roles.length; i++) {
			if (roles.indexOf(this.roles[i]) !== -1) {
				return true;
			}
		}
		return false;
	}
}

UserSchema.methods.toJson = function() {
	var obj = this.toObject();
  	delete obj.password;
  	return obj;
} 

module.exports = mongoose.model('User', UserSchema);