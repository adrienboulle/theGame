angular.module('listeCourses')
	.controller('SignupController', [
		'$scope',
		'$state',
		'$resource',
		'user',
		'SignupService',
		function($scope, $state, $resource, user, SignupService) {
			
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

		
		}])