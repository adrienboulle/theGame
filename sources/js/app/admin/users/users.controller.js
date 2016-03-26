(function(){
	'use strict'

	angular.module('theGame')
		.controller('UsersController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UsersService',
			'UserService',
			'RolesService',
			'user',
			usersController
		])
		.filter('notIn', [
			notInFilter
		]);

	function usersController($scope, $state, LoginService, SignupService, UsersService, UserService, RolesService, user) {
		
		UsersService.getAll().then(function(data) {
			$scope.users = data;
		})

		UserService.maxRoles().then(function(data) {
			if (data[0]) {
				$scope.minLevel = data[0].level;
				RolesService.getSupEgal($scope.minLevel).then(function(data) {
					var mapRoles = new Map();
					for (var i = 0; i < data.length; i++) {
						mapRoles.set(data[i].alias, data[i]);
					}
					$scope.rolesArr = data;
					$scope.rolesMap = mapRoles;
					$scope.selectedRole = data[0];
				})
			}
		})

		$scope.removeRole = function(user, role) {
			UsersService.removeRole(user, role).then(function() {
				for (var i = 0; i < user.roles.length; i++) {
					if (user.roles[i] === role) {
						user.roles.splice(i, 1);
					}
				}
			})
		}

		$scope.addRole = function(user, role) {
			for (var i = 0; i < user.roles.length; i++) {
				if (user.roles[i] === role.alias) {
					return;
				}
			}
			UsersService.addRole(user, role).then(function() {
				user.roles.push(role.alias);
				return;
			})
		}

		$scope.setActive = function(user, actif) {
			UsersService.toogleActif([user._id], actif);
		}		

		$scope.canAct = function(user, sameLevel) {
			var _minLevel;
			if (user && $scope.rolesMap) {
				for (var i = 0; i < user.roles.length; i++) {
					var r = user.roles[i];
					var role = $scope.rolesMap.get(r);
					if (!role) return false;
					if (_minLevel === undefined) {
						_minLevel = role.level;
					} else if (role.level < _minLevel) {
						_minLevel = role.level;
					}
				}
				if (sameLevel === false) _minLevel -= 1;
				return ($scope.minLevel !== 0) ? $scope.minLevel <= _minLevel : true;
			} else {
				return false;
			}
		}	
	}

	function notInFilter() {
		return function(items, array) {
			var roles = [];
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (array.indexOf(items[i].alias) == -1) {
						roles.push(items[i]);
					}
				}
			}
			return roles;
		}
	}
		

})();