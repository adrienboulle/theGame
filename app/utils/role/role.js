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


	// this is a function which the user have to define
	// it must return the best level of the users specified by theirs ids
	this.getUsersBestLevel = function(fn, ids, callback) {
		
		if (typeof fn === 'function') {
			return this.getUsersBestLevelFunction = fn;
		}
		
		if (!this.getUsersBestLevelFunction) {
			var err = new Error("You must provide a function to get best users level");
			callback(err);
		}

		if (this.getUsersBestLevelFunction) {
			this.getUsersBestLevelFunction(ids, function(err, level) {
				callback(err, level);
			});
		}
		
	}

	this.init = function(options) {
		var options = options || {};

		this.conf = {
			rolesFieldName: options.rolesFieldName || 'roles',
			actionsFieldName: options.actionsFieldName || 'actions',
			levelFieldName: options.levelFieldName || 'level'
		}
	}


	this.want = function(action) {
		var self = this;
		return function middleware(req, res, next) {
			if (req.isAuthenticated()) {
				var userRoles = req.user[self.conf.rolesFieldName];
				for (var i = 0; i < userRoles.length; i++) {
					var actions = userRoles[i][self.conf.actionsFieldName];
					if (userRoles[i].active && (actions.indexOf(action) != -1 || actions.indexOf("*") != -1)) {
						return next();
					}
				}
				return res.sendStatus(403);
			} else {
				return res.sendStatus(403);
			}
		}
	}

	// when a user wants to act on an other user or other users.
	// levelDelta is the level difference required to act
	// in options we can specify how to find the id of the users the user want to act on
	// ex : options = {isArray: true, field:'usersIds'} : we are looking for an array of user ids on req.body.userIds
	this.levelDelta = function(levelDelta, userOptions) {
		var self = this;
		return function middleware(req, res, next) {
			if (req.isAuthenticated()) {
				
				userOptions = userOptions || {};

				var options = {
					isArray: userOptions.isArray || false,
				}

				if (userOptions.field !== undefined) {
					options.field = userOptions.field;
				} else {
					options.field = (userOptions.isArray === true) ? 'ids' : 'id';
				}

				var ids = [];
				
				if (options.isArray === true) {
					ids = req.body[options.field];
					if (!ids) {
						var err = new Error("Bad options : field " + options.field + " not found in request body");
						console.error(err);
						return res.sendStatus(500);	
					}
				} else if (options.isArray === false) {
					ids.push(req.body[options.field]);
				} else {
					var err = new Error("Bad options : isArray must be a boolean");
					console.error(err);
					return res.sendStatus(500);
				}

				if (req.user[self.conf.levelFieldName] === 0) {
					return next();
				}

				self.getUsersBestLevel(null, ids, function(err, bestLevel) {
					if (err) {
						console.error(err);
						return res.sendStatus(500);
					}
					if (bestLevel !== undefined && req.user[self.conf.levelFieldName] > bestLevel + levelDelta) {
						return res.sendStatus(403);
					}
					return next();
				})
			} else {
				return res.sendStatus(403);
			}
		}
	}

	// when a user wants to act on role(s)
	// levelDelta is the level difference required to act
	// in options we can specify how to find the id(s) of the role(s) the user want to act on
	// ex : options = {isArray: true, field:'roleIds'} : we are looking for an array of role ids on req.body.roleIds
	this.actRole = function(levelDelta, userOptions) {
		var self = this;
		return function middleware(req, res, next) {
			if (req.isAuthenticated()) {
				
				userOptions = userOptions || {};

				var options = {
					isArray: userOptions.isArray || false,
				}

				if (userOptions.field !== undefined) {
					options.field = userOptions.field;
				} else {
					options.field = (userOptions.isArray === true) ? 'ids' : 'id';
				}

				var ids = [];
				
				if (options.isArray === true) {
					ids = req.body[options.field];
				} else if (options.isArray === false) {
					ids.push(req.body[options.field]);
				} else {
					var err = new Error("Bad options : isArray must be a boolean");
					console.error(err);
					return res.sendStatus(500);
				}

				if (req.user[self.conf.levelFieldName] === 0) {
					return next();
				}

				self.getRolesConf(null, function(err, roles) {
					if (err) {
						console.error(err);
						return res.sendStatus(500);
					}
					var found = 0;
					for (var i = 0; i < roles.length; i++) {
						if (ids.indexOf(roles[i].id) !== -1) {
							found++;
							if (req.user[self.conf.levelFieldName] > roles[i].level + levelDelta) {
								return res.sendStatus(403);
							}
						}
					}
					if (found !== ids.length) {
						return res.sendStatus(400);
					}
					return next();
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
