'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	crypto   = require('../utils/crypto.js');

var UserSchema = new Schema({
	username: String,
	password: String,
	actif: Boolean,
	roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
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

UserSchema.methods.getLevel = function() {
	var _bestLevel;
	for (var i = 0; i < this.roles.length; i++) {
		if (_bestLevel === undefined) {
			_bestLevel = this.roles[i].level;
		} else {
			_bestLevel = (this.roles[i].level < _bestLevel) ? this.roles[i].level : _bestLevel;
		}
	}
	return _bestLevel;
}

UserSchema.methods.toJson = function() {
	var obj = this.toObject();
  	delete obj.password;
  	obj.level = this.getLevel();
  	return obj;
} 

module.exports = mongoose.model('User', UserSchema);
