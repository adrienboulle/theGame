(function(){
	'use strict'

	angular.module('theGame')
		.controller('AccueilController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UserService',
			'user',
			accueilController
		])

	function accueilController($scope, $state, LoginService, SignupService, UserService, user) {
	
		$scope.user = user;

		$scope.logout = function() {
			LoginService.logout().then(function() {
				$state.go('site.login', null, {reload: true});
			})
		}

	}

})();