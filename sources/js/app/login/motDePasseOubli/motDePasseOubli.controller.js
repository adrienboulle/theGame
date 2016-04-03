(function(){
	'use strict'

	angular.module('theGame')
		.controller('MotDePasseOubliController', [
			'$scope',
			'$state',
			'LoginService',
			motDePasseOubliController
		])
		.directive('removeHandlers', [
			'$timeout',
			removeHandlers
		]);

	function motDePasseOubliController($scope, $state, LoginService) {
		
		$scope.showForm = true;

		$scope.motDePasseOubli = function() {
			LoginService.motDePasseOubli($scope.userInfoMotDePasseOubli.email).then(function(data) {
				$scope.showForm = false;
			}, function(data) {
				if (data.indexOf('ERRLOG401') != -1) {
					$scope.erreurLogin = 'Votre compte a été désactivé, mot de passe inchangeable';
				} else if (data.indexOf('ERRMAIL404') != -1) {
					$scope.erreurLogin = 'Email inexistant';
				}
			})
		}
	}

	function removeHandlers($timeout) {
		return {
		    restrict: 'A',
		    link: function(scope, elm, attr, ctrl) {
				$timeout(function() {
					elm.off();
				}, 0);
	    	}
  		}
	}

})();