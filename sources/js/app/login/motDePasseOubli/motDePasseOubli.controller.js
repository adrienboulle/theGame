(function(){
	'use strict'

	angular.module('theGame')
		.controller('MotDePasseOubliController', [
			'$scope',
			'$stateParams',
			'$state',
			'LoginService',
			motDePasseOubliController
		])
		.directive('removeHandlers', [
			'$timeout',
			removeHandlers
		]);

	function motDePasseOubliController($scope, $stateParams, $state, LoginService) {
		
		$scope.showForm = true;

		if ($stateParams.token && $stateParams.email) {
			$scope.userInfoChangePassword = {
				email: $stateParams.email,
				token: $stateParams.token
			}
		}

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

		$scope.changePassword = function() {
			LoginService.changePassword($scope.userInfoChangePassword).then(function(data) {
				// todo
			}, function(data) {
				// todo
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