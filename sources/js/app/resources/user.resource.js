(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('UserResource', [
			'$resource',
			userResource
		]);

	function userResource($resource) {
			
		return $resource('/api/user/:id', {id: '@id'}, {
			'get': {
				method: 'GET'
			}
		})

	}

})();