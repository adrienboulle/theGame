(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('LoginResource', [
			'$resource',
			loginResource
		]);

	function loginResource($resource) {
  							
		return $resource('/api/login', {}, {
			'login': {
				method: 'POST'
			},
			'logout': {
				method: 'DELETE'
			}
		})
		
	}
	
})();