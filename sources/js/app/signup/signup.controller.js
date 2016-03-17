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
		
		$scope.userInfo = {
			username:'', 
			password:'', 
			passwordConfirmation:'',
			usernameValidation: function(){
				if (this.username.length < 5){
					return "Yo pouleeeet"
				}
			}
		};

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