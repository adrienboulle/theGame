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