(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('SignupResource', [
			'$resource',
			'$location',
			'$q',
			SignupResource
		]);

	function SignupResource($resource, $location, $q) {
			
		return $resource('/api/signup', {}, {
			'signup': {
				method: 'POST'
			}
		})

	}

})();