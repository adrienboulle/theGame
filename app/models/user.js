'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema,
	crypto   = require('../utils/crypto.js');

var UserSchema = new Schema({
	username: {type: String, unique: true},
	password: String,
	password_token: {type: String, unique: true, sparse: true},
	email: {type: String, unique: true},
	email_confirm: Boolean,
	email_token: {type: String, unique: true, sparse: true},
	actif: Boolean,
	roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
	creation: Date,
	lastConnexion: Date
});

UserSchema.path('email').validate(function(email) {
	var patt = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
	var emailRegex = new RegExp(patt);
	return emailRegex.test(email);
});

UserSchema.methods.verifyCredentials = function(password, callback) {
	if (!this.actif) return callback("ERLOG401", false);
	if (!this.email_confirm) return callback("ERVAL009", false);
	var combined = new Buffer(this.password, 'base64');
	crypto.verify(password, combined, function(err, loggedIn) {
		if (!err && !loggedIn) {
			err = "ERLOG403";
		}
		return callback(err, loggedIn);
	})
}

UserSchema.methods.getLevel = function() {
	var _bestLevel;
	for (var i = 0; i < this.roles.length; i++) {
		if (!this.roles[i].active) continue;
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
