'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	crypto   = require('../utils/crypto.js');

var UserSchema = new Schema({
	username: String,
	password: String,
	role: String
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
		return roles.indexOf(this.role) !== -1;
	}
}

UserSchema.methods.toJson = function() {
	var obj = this.toObject();
  	delete obj.password;
  	return obj;
} 

module.exports = mongoose.model('User', UserSchema);