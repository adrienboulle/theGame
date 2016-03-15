(function(){
	angular.module('theGame')
		.config([
			'$stateProvider',
			Config
		]);

	function Config($stateProvider) {
		$stateProvider
	    	.state('site', {
	    		abstract: true,
	    		resolve : {
	    			user: [
	    				'LoginService',
	    				function(LoginService) {
		    				return LoginService.currentUser().then(function(user) {
		    					return user;
		    				});		
	    				}
	    			]
	    		}
	    	})
	}

})();