(function(){
	'use strict'

	angular.module('theGame')
		.controller('NavbarController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'user',
			navbarController
		]);

	function navbarController($scope, $state, LoginService, SignupService, user) {
	
		$scope.user = user;
		$scope.$state = $state;

	}

})();