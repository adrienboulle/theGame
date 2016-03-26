'user strict'

var Role = require('../app/models/role.js'),
	User = require('../app/models/user.js');

module.exports = function(role) {
	
	role.getRolesConf(function(done) {
		Role.find({active:true}, function(err, roles) {
			var rolesMap = new Map();
			for (var i = 0; i < roles.length; i++) {
				rolesMap.set(roles[i].alias, roles[i].actions);
			}
			done(err, rolesMap);
		})
	});

	role.getLevel(function(ids, done) {
		User.find({'_id': { $in: ids}}, function(err, users) {
			Role.find({active:true}, function(err, roles) {
				var _minLevl;
				for (var j = 0; j < users.length; j++) {
					for (var i = 0; i < roles.length; i++) {
						if (users[j].roles.indexOf(roles[i].alias) != -1) {
							if (_minLevl === undefined) {
								_minLevl = roles[i].level;
							} else {
								_minLevl = (roles[i].level < _minLevl) ? roles[i].level : _minLevl;
							}
						}
					}
				}
				done(err, _minLevl);
			})	
		})
	});

	role.init({
		superAdminAlias: 'SUPER_ADMIN'
	})

}
