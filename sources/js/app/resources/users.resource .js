(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('UsersResource', [
			'$resource',
			usersResource
		]);

	function usersResource($resource) {
			
		return $resource('/api/users', {}, {
			'get': {
				method: 'GET',
				isArray: true,
			}
		})

	}

})();