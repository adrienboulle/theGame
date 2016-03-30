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
		.directive('unique',[
			'SignupService',
			uniqueDirective
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
					$scope.erreurLogin = 'Votre compte a ete désactivé';
				} else if (data.indexOf('ERLOG403') != -1) {
					$scope.erreurLogin = 'Mot de passe erroné';
				} else if (data.indexOf('ERLOG404') != -1) {
					$scope.erreurLogin = 'Utilisateur inexistant';
				}
			})
		}

		$scope.signup = function() {
			if ($scope.userFormSignup.$valid) {
				SignupService.signup($scope.userInfoSignup).then(function(data) {
					$state.reload();
				}, function(data) {
				})
			} else {
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

	function uniqueDirective(SignupService, $q) {
		return {
		    restrict: 'A',
		    require: '?ngModel',
		    link: function(scope, elm, attr, ctrl) {
				if (!ctrl) return; 
				
				ctrl.$validators.unique = function(modelValue, viewValue) {
					if (modelValue && modelValue.length > 0) {
						SignupService.testUsername(modelValue).then(function(exists) {
							ctrl.$setValidity('unique', !exists);
						})
					}
					return modelValue;
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