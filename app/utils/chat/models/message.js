'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var MessageSchema = new Schema({
	message: String,
	room: String,
	date: Date
});

module.exports = mongoose.model('Message', MessageSchema);