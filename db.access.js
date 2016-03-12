var mongoose = require('mongoose');
mongoose.connect('localhost:27017/theGame');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	role: String
});

var User = mongoose.model('users', userSchema);

exports.User = User