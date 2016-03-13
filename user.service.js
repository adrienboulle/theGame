var cryptoPassword = require('./crypto.password.js');
var dbAcces = require('./db.access.js');

var User = dbAcces.User;

function createUser(username, password, role, callback) {
	cryptoPassword.hashPassword(password, function(err, hash) {
		if (err) {
			callback(err);
		} else {
			var user = new User({
				username: username,
				password: hash.toString('base64'),
				role: role
			});
			user.save(function(err, user) {
				callback(err, user);	
			});
		}
	})
}

function findByUsername(username, callback) {
	User.find({'username': username}, function(err, user) {
		if (err || err != null) {
			callback(err);
		} else if (user.length > 1) {
			callback('multiple users found, hum...this is awkward');
		} else if (user.length == 0) {
			callback(null, null);
		} else {
			callback(null, user[0]._doc);
		}
	})
}

function findById(id, callback) {
	User.find({'_id': id}, function(err, user) {
		if (err || err != null) {
			callback(err);
		} else if (user.length > 1) {
			callback('multiple users found, hum...');
		} else if (user.length == 0) {
			callback(null, null);
		} else {
			callback(null, user[0]._doc);
		}
	})
}

function signupUser(username, password, passwordConfirmation, callback){
	if(passwordConfirmation === password && password.length>5){
		findByUsername(username, function(err, user) {
			if(user){
				callback("Nom d'utilisateur déjà utilisé");
			}else{
				createUser(username, password, 'ROLE_USER', function(err, user){
					callback((!err)?null:'Erreur interne', user);
				})
			}
		})

	}else if(passwordConfirmation!=password){
		callback("Les mot de passes ne sont pas identiques");
	}else if(password.length<=5){
		callback("Mot de passe trop petit, veuillez utiliser 6 caractères au minimun");
	}
}

// pour debug
findByUsername('admin', function(err, user) {
	if (user == null) {
		createUser('admin', 'admin', 'ROLE_ADM', function(err, user) {
			if (err) {
				console.log("Erreur lors de la création de lutilisateur de débug")
			} else {
				console.log("Utilisateur admin:admin (ROLE_ADM) créé");
			}

		})
	}
})


exports.findByUsername = findByUsername;
exports.findById = findById;
exports.createUser = createUser;
exports.signupUser = signupUser;