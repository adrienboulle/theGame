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
	console.log('done');
})

function addUser(line, done) {
	crypto.generateToken(32, function(err, token){
		var user = new User({
			username: line[0],
			password: "AAAAEAANUVfpJA37BWxObpIE7Hn8W2/DTaVyR9cYFx5zFE7ZQFqe55PkkSP5CUr46RgmGqyeCz4=",
			email: line[0].toLowerCase() + '@yopmail.com',
			roles: [userRole.id],
			actif: false,
			creation: new Date(),
			token: token
		});
		user.save(function(err, user) {
			done();
		});
	})
}