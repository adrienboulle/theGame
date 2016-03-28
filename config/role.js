'user strict'

var Role = require('../app/models/role.js'),
	User = require('../app/models/user.js');

module.exports = function(role) {
	
	role.getRolesConf(function(done) {
		Role.find({active:true}, function(err, roles) {
			done(err, roles);
		})
	});

	role.getUsersBestLevel(function(ids, done) {
		User.find({'_id': { $in: ids}})
			.populate('roles')
			.exec(function(err, users) {
				if (err) {
					done(err, null);
				}
				var _bestLevel;
				for (var i = 0; i < users.length; i++) {
					if (_bestLevel === undefined) {
						_bestLevel = users[i].getLevel();
					} else {
						_bestLevel = (users[i].getLevel() < _bestLevel) ? users[i].getLevel() : _bestLevel;
					}
				}
				done(null, _bestLevel);
		})
	});

	role.init()

}
