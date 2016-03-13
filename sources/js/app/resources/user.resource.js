(function(){
	angular.module('theGame')
		.factory('UserResource', [
			'$resource',
			'$location',
			'$q',
			function($resource, $location, $q) {
	  			
				var host = $location.host();
				var port = $location.port();

				if (port && port > 0) {
					host += ':' + port;
				}

	  			return $resource('http://' + host + '/api/user/:id', {id: '@id'}, {
					'get': {
						method: 'GET'
					}
	  			})

	  		}]);
})();