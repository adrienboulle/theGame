(function(){
	angular.module('theGame')
		.controller('AccueilController', [
			'$scope',
			'$state',
			'LoginService',
			'user',
			AccueilController
		]);

	function AccueilController($scope, $state, LoginService, user) {
	
		$scope.user = user;

		$scope.logout = function() {
			LoginService.logout().then(function() {
				$state.reload();
			})
		}
	}

})();

(function(){
	angular.module('theGame')
		.controller('LoginController', [
			'$scope',
			'$state',
			'$resource',
			'user',
			'LoginService',
			LoginController
		]);

	function LoginController($scope, $state, $resource, user, LoginService) {
		
		$scope.userInfo = {username:'', password:''};

		$scope.erreur = '';

		$scope.login = function() {
			LoginService.login($scope.userInfo).then(function(data) {
				$state.go('site.accueil', {}, {
					reload: true
				});
			}, function(data) {
				$scope.erreur = 'Erreur !';
			})
		}

	
	}

})();

(function(){
	angular.module('theGame')
		.controller('SignupController', [
			'$scope',
			'$state',
			'$resource',
			'user',
			'SignupService',
			SignupController
		])
		.directive('match',
			MatchDirective);

	function SignupController($scope, $state, $resource, user, SignupService) {
		
		$scope.erreur = '';

		$scope.signup = function() {
			if ($scope.userForm.$valid) {
				SignupService.signup($scope.userInfo).then(function(data) {
					$state.go('site.login', {}, {
						reload: true
					});
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
					return modelValue && modelValue === ctrl.$$parentForm[attr.match].$modelValue;
				}

				attr.$observe('match', function() {
					ctrl.$validate();
				})
	    	}
  		}
	}

})();