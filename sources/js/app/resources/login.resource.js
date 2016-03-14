(function(){
	angular.module('theGame')
		.factory('LoginResource', [
			'$resource',
			'$location',
			'$q',
			function($resource, $location, $q) {
	  							
	  			return $resource('/api/login', {}, {
					'login': {
						method: 'POST'
					},
					'logout': {
						method: 'DELETE'
					}
	  			})
	  			
	  		}]);
})();