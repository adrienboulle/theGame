(function(){
	angular.module('theGame')
		.controller('AccueilController', [
			'$scope',
			'$state',
			'LoginService',
			'user',
			function($scope, $state, LoginService, user) {
			
				$scope.user = user;

				$scope.logout = function() {
					LoginService.logout().then(function() {
						$state.reload();
					})
				}
			}])
})();