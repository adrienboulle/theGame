(function(){
	angular.module('theGame')
		.factory('UserResource', [
			'$resource',
			'$location',
			'$q',
			function($resource, $location, $q) {
	  			
	  			return $resource('/api/user/:id', {id: '@id'}, {
					'get': {
						method: 'GET'
					}
	  			})

	  		}]);
})();