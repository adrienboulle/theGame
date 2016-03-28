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
		])
		.filter('hasRoleSelected', [
			hasRoleSelected
		]);

	function usersController($scope, $state, LoginService, SignupService, UsersService, UserService, RolesService, user) {
		
		$scope.curUser = user;

		$scope.init = function() {
			UsersService.getAll().then(function(data) {
				$scope.users = data;
			})
		}

		$scope.init();

		RolesService.getAll().then(function(data) {
			if (data[0]) {
				$scope.roles = data;
			}
		})

		$scope.removeRole = function(user, role) {
			UsersService.removeRole(user, role._id).then(function() {
				$scope.init();
			})
		}

		$scope.addRole = function(user, role) {
			UsersService.addRole(user, role._id).then(function() {
				$scope.init();
			})
		}

		$scope.setActive = function(user, actif) {
			var _back = !user.actif;
			UsersService.toogleActif([user._id], actif).then(function() {

			}, function() {
				user.actif = _back;
			});
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
					if (!inArray(items[i], array) && ids.indexOf(items[i]._id) === -1 && items[i].active && (items[i].level >= lvl || lvl === 0)) {
						ids.push(items[i]._id);
						roles.push(items[i]);
					} 
				}
			}
			return roles;
		}
	}

	function hasRoleSelected() {
		return function(items, roles) {
			var users = [],
				idsRS = [],
				ids = [];

			if (items && roles) {
				for (var i = 0; i < roles.length; i++) {
					if (roles[i].selected === true) {
						idsRS.push(roles[i]._id);
					}
				}
				if (idsRS.length === 0) return items;
				// pour chaque user
				for (var i = 0; i < items.length; i++) {
					// pour chaque role de l'user
					for (var j = 0; j < items[i].roles.length; j++) {
						if (idsRS.indexOf(items[i].roles[j]._id) !== -1 && ids.indexOf(items[i]._id) === -1) {
							ids.push(items[i]._id);
							users.push(items[i]);
						}
					}
				}
			}
			return users;
		}
	}
		

})();