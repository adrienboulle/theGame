(function(){
	'use strict'

	angular.module('theGame')
		.controller('UsersController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UsersService',
			'user',
			usersController
		])

	function usersController($scope, $state, LoginService, SignupService, UsersService, user) {
		
		UsersService.getAll().then(function(data) {
			$scope.users = data;
		})

		$scope.setActive = function(user, actif) {
			UsersService.toogleActif([user._id], actif);
		}
		
	}

})();