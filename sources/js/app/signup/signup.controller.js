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
			erreurUsername: false,
			erreurPassword: false,
			erreurPasswordConfirmation: false,
			isErreurUsername: function(){
				return this.erreurUsername;
			},
			isErreurPassword: function(){
				return this.erreurPassword;
			},
			isErreurPasswordConfirmation: function(){
				return this.erreurPasswordConfirmation;
			},
			usernameValidation: function(){
				if (this.username.length < 6){
					this.erreurUsername = true;
					return "6 caractères minimum";
				}else{
					this.erreurUsername = false;
				}
			},
			passwordValidation: function(){
				if (this.password.length < 8){
					this.erreurPassword = true;
					return "8 caractères minimum";
				}else{
					this.erreurPassword = false;
				}
			},
			passwordConfirmationValidation: function(){
				if (this.passwordConfirmation != this.password){
					this.erreurPasswordConfirmation = true;
					return "Non identique";
				}else{
					this.erreurPasswordConfirmation = false;
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