(function(){
	angular.module('theGame')
		.factory('SignupResource', [
			'$resource',
			'$location',
			'$q',
			function($resource, $location, $q) {
	  			
	  			return $resource('/api/signup', {}, {
					'signup': {
						method: 'POST'
					}
	  			})

	  		}]);
})();