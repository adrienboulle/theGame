(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('UsersResource', [
			'$resource',
			usersResource
		]);

	function usersResource($resource) {
			
		return $resource('/api/users/:page', {page:'@page'}, {
			'get': {
				method: 'GET',
				isArray: true,
				params: {
					filtres: '@filtres'
				}
			}
		})

	}

})();