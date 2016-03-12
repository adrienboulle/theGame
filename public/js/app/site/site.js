angular.module('listeCourses')
	.config(function($stateProvider) {
		$stateProvider
	    	.state('site', {
	    		abstract: true,
	    		resolve : {
	    			user: function(LoginService) {
	    				return LoginService.currentUser().then(function(user) {
	    					return user;
	    				});		
	    			}
	    		}
	    	})
	});