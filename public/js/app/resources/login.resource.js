angular.module('listeCourses')
	.factory('LoginResource', [
		'$resource',
		'$q',
		function($resource, $q) {
  			
  			return $resource('http://localhost:8085/api/login', {}, {
				'login': {
					method: 'POST'
				},
				'logout': {
					method: 'DELETE'
				}
  			})

  		}]);