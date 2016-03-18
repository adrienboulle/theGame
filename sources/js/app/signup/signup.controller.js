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
			$scope.userForm.$submitted = false;
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