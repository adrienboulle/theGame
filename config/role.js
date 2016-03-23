'user strict'

var Role = require('../app/models/role.js');

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

	role.init({
		superAdminAlias: 'SUPER_ADMIN'
	})

}
