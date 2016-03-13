angular.module('listeCourses')
	.factory('LoginResource', [
		'$resource',
		'$location',
		'$q',
		function($resource, $location, $q) {
  			
			var host = $location.host();
			var port = $location.port();

			if (port && port > 0) {
				host += ':' + port;
			}

  			return $resource('http://' + host + '/api/login', {}, {
				'login': {
					method: 'POST'
				},
				'logout': {
					method: 'DELETE'
				}
  			})

  		}]);