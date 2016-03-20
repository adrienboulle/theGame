(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('SignupResource', [
			'$resource',
			signupResource
		]);

	function signupResource($resource) {
			
		return $resource('/api/signup', {}, {
			'signup': {
				method: 'POST'
			}
		})

	}

})();