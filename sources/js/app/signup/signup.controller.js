(function(){
	angular.module('theGame')
		.controller('SignupController', [
			'$scope',
			'$state',
			'$resource',
			'user',
			'SignupService',
			SignupController
		]);

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
				$scope.errur = 'non valide';
			}
		}
	}

})();