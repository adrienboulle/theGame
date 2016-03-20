(function(){
	'use strict'

	angular.module('theGame')
		.controller('AdminController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'user',
			adminController
		])

	function adminController($scope, $state, LoginService, SignupService, user) {
	
		
	}

})();