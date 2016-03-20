(function(){
	'use strict'

	angular.module('theGame')
		.factory('UserService', [
			'$q',
			'UserResource',
			'LoginResource',
			UserService
		]);

	function UserService($q, UserResource, LoginResource) {
	  		
  		var _user,
  			_authenticated,
  			_cache,
  			_init = function() {
  				_authenticated = undefined;
  				_user = undefined;
  			};

  		_init();
  		
  		return {
			init: function() {
				_init();
			},
			user: function() {
				var p = $q.defer();
				if (_user) {
					p.resolve(_user);
				} else {
					_cache = p;
					LoginResource.get().$promise.then(function(data) {
						if (data.isAuthenticated) {
							_authenticated = true;
							_user = data.user;
						} else {
							_authenticated = false;
							_user = {};
						}
						p.resolve(_user);
						_cache = undefined;
					})
				}
				return p.promise;
			},
			login: function(userInfo) {
				var p = $q.defer();
				UserResource.login().then(function(data) {
					_user = data;
					p.resolve(_user);
				})
				return p.promise;
			},
			hasRole: function(roles) {
				var p = $q.defer();
				var _self = this;

				var _f = function() {
					p.resolve(_hasRole(roles));
				}

				var _hasRole = function(roles) {
					if (_authenticated === false || (_user && !_user.roles)) {
						return false;
					}

					for (var i = 0; i < roles.length; i++) {
						if (_user.roles.indexOf(roles[i]) !== -1) {
							return true;
						}
					}

					return false;
				}

				if (_cache) {
					_cache.promise.then(_f);
				} else if (_user) {
					_f();
				} else {
					_self.user().then(_f);
				}
				
				return p.promise;                      
			},
			isAuthenticated: function() {
				var p = $q.defer();
				var _self = this;

				var _f = function() {
					p.resolve(_isAuthenticated());
				}

				var _isAuthenticated = function() {
					if (_authenticated === true) {
						return true;
					}
					return false;
				}

				if (_cache) {
					_cache.promise.then(_f);
				} else if (_user) {
					_f();
				} else {
					_self.user().then(_f);
				}
				
				return p.promise;       
			}
		}
	 }

})();