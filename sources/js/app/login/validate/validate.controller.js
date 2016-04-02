(function(){
	'use strict'

	angular.module('theGame')
		.controller('ValidateController', [
			'$scope',
			'$stateParams',
			'$state',
			'SignupService',
			ValidateController
		])

	function ValidateController($scope, $stateParams, $state, SignupService) {
		
		$scope.validation = true;

		SignupService.validate($stateParams.token).then(function() {
			$scope.validation = false;
			$scope.ok = true;
		}, function(data) {
			if (data.indexOf('ERVAL500') != -1) {
				$scope.error = 'Erreur lors de la validation';
			} else if (data.indexOf('ERRVAL404') != -1) {
				$scope.error = 'Aucun compte associé';
			}
			$scope.validation = false;
			$scope.ok = false;
		})
		
	}

})();