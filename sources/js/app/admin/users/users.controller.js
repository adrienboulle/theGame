(function(){
	'use strict'

	angular.module('theGame')
		.controller('UsersController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UsersService',
			'RolesService',
			'user',
			usersController
		])
		.filter('notIn', [
			notInFilter
		]);

	function usersController($scope, $state, LoginService, SignupService, UsersService, RolesService, user) {
		
		UsersService.getAll().then(function(data) {
			$scope.users = data;
		})

		RolesService.getAll().then(function(data) {
			$scope.roles = data;
			$scope.selectedRole = data[0];
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
				for (var i = 0; i < $scope.roles.length; i++) {
					if ($scope.roles[i].alias === role.alias) {
						user.roles.push($scope.roles[i].alias);
						return;
					}
				}
			})
		}

		$scope.setActive = function(user, actif) {
			UsersService.toogleActif([user._id], actif);
		}
		
		$scope.notIn = function(userRoles, user) {
			for (var i = 0; i < $scope.roles.length; i++) {
				if ($scope.roles[i].alias === role.alias) {
					user.roles.push($scope.roles[i].alias);
					return;
				}
			}
		}

	}

	function notInFilter() {
		return function(items, userRoles) {
			var roles = [];
			for (var i = 0; i < items.length; i++) {
				if (userRoles.indexOf(items[i].alias) == -1) {
					roles.push(items[i]);
				}
			}
			return roles;
		}
	}

})();