(function(){
	angular.module('theGame')
		.factory('LoginResource', [
			'$resource',
			'$location',
			'$q',
			LoginResource
		]);

	function LoginResource($resource, $location, $q) {
  							
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