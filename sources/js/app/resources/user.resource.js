(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('UserResource', [
			'$resource',
			'$location',
			'$q',
			UserResource
		]);

	function UserResource($resource, $location, $q) {
			
		return $resource('/api/user/:id', {id: '@id'}, {
			'get': {
				method: 'GET'
			}
		})

	}

})();