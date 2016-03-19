(function(){
	angular.module('theGame')
		.controller('AccueilController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'user',
			AccueilController
		])
		.directive('match',
			MatchDirective);

	function AccueilController($scope, $state, LoginService, SignupService, user) {
	
		$scope.user = user;

		$scope.logout = function() {
			LoginService.logout().then(function() {
				$state.reload();
			})
		}

		$scope.login = function() {
			LoginService.login($scope.userInfoSignin).then(function(data) {
				$state.reload();
			}, function(data) {
				$scope.erreur = 'Erreur !';
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

	function MatchDirective() {
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
})();