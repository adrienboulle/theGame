(function(){
	angular.module('theGame')
		.controller('SignupController', [
			'$scope',
			'$state',
			'$resource',
			'user',
			SignupController
		]);

	function SignupController($scope, $state, $resource, user, SignupService) {
		
		$scope.userInfo = {username:'', password:'', passwordConfirmation:''};

		$scope.erreur = '';

		$scope.signup = function() {
			SignupService.signup($scope.userInfo).then(function(data) {
				$state.go('site.login', {}, {
					reload: true
				});
			}, function(data) {
				$scope.erreur = 'Erreur !';
			})
		}
	}

})();