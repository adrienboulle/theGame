angular.module('listeCourses')
	.factory('SignupResource', [
		'$resource',
		'$q',
		function($resource, $q) {
  			
  			return $resource('http://localhost:8085/api/signup', {}, {
				'signup': {
					method: 'POST'
				}
  			})

  		}]);