'user strict'

var Role = function() {
	
	this.conf;

	this.getRolesConf = function(fn, callback) {
		
		if (typeof fn === 'function') {
			return this.getRolesConfFunction = fn;
		}

		if (this.conf.roles) {
			callback(null, this.conf.roles);
		}
		
		if (!this.getRolesConfFunction && !this.conf.roles) {
			var err = new Error("You must provide a role configutation (static or via db)");
			callback(err);
		}

		if (this.getRolesConfFunction) {
			this.getRolesConfFunction(function(err, roles) {
				callback(err, roles);
			});
		}
	}

	this.getLevel = function(fn, ids, callback) {
		
		if (typeof fn === 'function') {
			return this.getLevelFunction = fn;
		}
		
		if (!this.getLevelFunction) {
			var err = new Error("You must provide a function to get users level");
			callback(err);
		}

		if (this.getLevelFunction) {
			this.getLevelFunction(ids, function(err, level) {
				callback(err, level);
			});
		}
		
	}

	this.init = function(options) {
		var options = options || {};

		this.conf = {
			rolesFieldName: options.rolesFieldName || 'roles',
			actionsFieldName: options.actionsFieldName || 'actions'
		}
	}


	this.want = function(action) {
		var self = this;
		return function middleware(req, res, next) {
			if (req.isAuthenticated()) {
				var userRoles = req.user[self.conf.rolesFieldName];
				for (var i = 0; i < userRoles.length; i++) {
					var actions = userRoles[i][self.conf.actionsFieldName];
					if (actions.indexOf(action) != -1 || actions.indexOf("*") != -1) {
						return next();
					}
				}
				return res.sendStatus(403);
			} else {
				return res.sendStatus(403);
			}
		}
	}


	this.levelDelta = function(levelDelta) {
		var self = this;
		return function middleware(req, res, next) {
			if (req.isAuthenticated()) {
				var ids = [];
				if (req.body.ids) {
					ids = req.body.ids;
				} else {
					ids.push(req.body.id);
				}
				self.getLevel(null, ids, function(err, bestLevel) {
					if (err) {
						console.error(err);
						return res.sendStatus(500);
					}
					if (bestLevel === undefined) {
						return next();
					}
					if (req.user.level <= bestLevel + levelDelta || req.user.level === 0) {
						return next();
					} else {
						return res.sendStatus(403);
					}
				})
			} else {
				return res.sendStatus(403);
			}
		}
	}

	this.Error = function(message) {
		this.message = message;
	}

}

module.exports = new Role();
