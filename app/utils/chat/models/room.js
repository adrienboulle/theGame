'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var RoomSchema = new Schema({
	name: String,
	participants: [String],
	owners: [String]
});

module.exports = mongoose.model('Room', RoomSchema);