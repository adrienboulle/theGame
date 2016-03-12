angular.module('listeCourses')
	.factory('UserResource', [
		'$resource',
		'$q',
		function($resource, $q) {
  			
  			return $resource('http://localhost:8085/api/user/:id', {id: '@id'}, {
				'get': {
					method: 'GET'
				}
  			})

  		}]);