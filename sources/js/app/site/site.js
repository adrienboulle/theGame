(function(){
	'use strict'

	angular.module('theGame')
		.config([
			'$stateProvider',
			Config
		]);

	function Config($stateProvider) {
		$stateProvider
	    	.state('site', {
	    		abstract: true,
	    		views: {
	    			'navbar@': {
        				templateUrl: 'js/app/components/navbar/navbar.html',
      					controller: 'NavbarController'
      				}
	    		},
	    		resolve : {
	    			user: [
	    				'$q',
	    				'UserService',
	    				function($q, UserService) {
		    				var d = $q.defer();
		    				UserService.user().then(function(user) {
		    					d.resolve(user);
		    				});
		    				return d.promise;
	    				}
	    			]
	    		}
	    	})
	}

})();