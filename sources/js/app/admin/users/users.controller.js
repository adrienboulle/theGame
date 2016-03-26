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
		
		$scope.curUser = user;

		UsersService.getAll().then(function(data) {
			$scope.users = data;
		})

		RolesService.getAll().then(function(data) {
			if (data[0]) {
				$scope.roles = data;
			}
		})

		$scope.removeRole = function(user, role) {
			UsersService.removeRole(user, role._id).then(function() {
				for (var i = 0; i < user.roles.length; i++) {
					if (user.roles[i]._id === role._id) {
						user.roles.splice(i, 1);
					}
				}
			})
		}

		$scope.addRole = function(user, role) {
			for (var i = 0; i < user.roles.length; i++) {
				if (user.roles[i]._id === role._id) {
					return;
				}
			}
			UsersService.addRole(user, role._id).then(function() {
				user.roles.push(role);
				return;
			})
		}

		$scope.setActive = function(user, actif) {
			UsersService.toogleActif([user._id], actif);
		}		
	}

	function notInFilter() {
		return function(items, array, lvl) {
			var roles = [],
				ids = [],
				inArray = function(item, arr) {
					for (var i = 0; i < arr.length; i++) {
						if (item._id === arr[i]._id) return true;
					}
					return false;
				};
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (!inArray(items[i], array) && ids.indexOf(items[i]._id) === -1 && (items[i].level >= lvl || lvl === 0)) {
						ids.push(items[i]._id);
						roles.push(items[i]);
					} 
				}
			}
			return roles;
		}
	}
		

})();