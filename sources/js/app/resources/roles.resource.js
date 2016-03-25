(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('RolesResource', [
			'$resource',
			rolesResource
		]);

	function rolesResource($resource) {
			
		return $resource('/api/roles', {}, {
			'get': {
				method: 'GET',
				isArray: true,
			}
		})

	}

})();