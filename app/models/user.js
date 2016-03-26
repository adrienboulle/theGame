'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	crypto   = require('../utils/crypto.js');

var UserSchema = new Schema({
	username: String,
	password: String,
	actif: Boolean,
	roles: [String],
	lastConnexion: Date
});

UserSchema.methods.verifyCredentials = function(password, callback) {
	if (!this.actif) return callback("ERLOG401", false);
	var combined = new Buffer(this.password, 'base64');
	crypto.verifyPassword(password, combined, function(err, loggedIn) {
		if (!err && !loggedIn) {
			err = "ERLOG403";
		}
		return callback(err, loggedIn);
	})
}

UserSchema.methods.hasRole = function(roles) {
	if (!roles) {
		throw 'hasHab function take an array in parameter'
	} else {
		for (var i = 0; i < this.roles.length; i++) {
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
