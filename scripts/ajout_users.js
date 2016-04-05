var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var User = require('../app/models/user.js');
var Role = require('../app/models/role.js');
var crypto = require('../app/utils/crypto.js');
var inputFile = 'noms.csv';
var mongoose = require('mongoose');
var userRole;

mongoose.connect('localhost:27017/theGame');

var parser = parse({delimiter: ','}, function (err, data) {
	async.eachSeries(data, function (line, callback) {
    	addUser(line, function() {
    		callback();
    	})
  	})
})

Role.findOne({alias:'ROLE_USER'}, function(err, role) {
	userRole = role;
	fs.createReadStream(inputFile).pipe(parser);
})

function addUser(line, done) {
	crypto.generateToken(8, function(err, token){
		var user = new User({
			username: line[0] + token.substring(0, 8),
			password: "AAAAEAANUVfpJA37BWxObpIE7Hn8W2/DTaVyR9cYFx5zFE7ZQFqe55PkkSP5CUr46RgmGqyeCz4=",
			email: line[0].toLowerCase() + token.substring(0, 4) + '@yopmail.com',
			email_token: token,
    		email_confirm: false,
			roles: [userRole.id],
			actif: true,
			creation: new Date()
		});
		user.save(function(err, user) {
			done();
		});
	})
}