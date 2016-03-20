(function(){
	'use strict'

	angular.module('theGame')
		.controller('LoginController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UserService',
			'user',
			loginController
		])
		.directive('match',[
			matchDirective
		])
		.directive('removeHandlers', [
			'$timeout',
			removeHandlers
		]);

	function loginController($scope, $state, LoginService, SignupService, UserService, user) {
	
		$scope.user = user;

		$scope.login = function() {
			LoginService.login($scope.userInfoSignin).then(function(data) {
				$state.go('site.accueil', null, {reload: true});
			}, function(data) {
				if (data.indexOf('ERLOG401') != -1) {
					$scope.erreur = 'Votre compte a ete désactivé';
				} else if (data.indexOf('ERLOG403') != -1) {
					$scope.erreur = 'Mot de passe erroné';
				} else if (data.indexOf('ERLOG404') != -1) {
					$scope.erreur = 'Utilisateur inexistant';
				}
			})
		}

		$scope.signup = function() {
			if ($scope.userFormSignup.$valid) {
				SignupService.signup($scope.userInfoSignup).then(function(data) {
					$state.reload();
				}, function(data) {
					$scope.erreur = 'Erreur !';
				})
			} else {
				$scope.erreur = 'non valide';
			}
		}
	}

	function matchDirective() {
		return {
		    restrict: 'A',
		    require: '?ngModel',
		    link: function(scope, elm, attr, ctrl) {
				if (!ctrl) return; 

				ctrl.$validators.match = function(modelValue, viewValue) {
					return modelValue && modelValue === ctrl.$$parentForm[attr.match].$viewValue;
				}

				attr.$observe('match', function() {
					ctrl.$validate();
				})
	    	}
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