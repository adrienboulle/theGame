(function(){
	angular.module('theGame')
		.factory('SignupResource', [
			'$resource',
			'$location',
			'$q',
			function($resource, $location, $q) {
	  			
	  			var host = $location.host();
				var port = $location.port();

				if (port && port > 0) {
					host += ':' + port;
				}

	  			return $resource('http://' + host + '/api/signup', {}, {
					'signup': {
						method: 'POST'
					}
	  			})

	  		}]);
})();