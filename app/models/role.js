'user strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var RoleSchema = new Schema({
	alias: String,
	active: Boolean,
	actions: [String]
});

module.exports = mongoose.model('Role', RoleSchema);
