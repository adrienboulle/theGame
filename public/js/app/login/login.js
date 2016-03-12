angular.module('listeCourses')
	.config(function($stateProvider) {
		$stateProvider
	    	.state('site.login', {
	    		parent: 'site',
	      		url: '/login',
	      		views: {
	        		"content@": {
	        			templateUrl: 'js/app/login/login.html',
	      				controller: 'LoginController'
	        		}
	      		},
	      		resolve: {
	      			authenticated: function($q, $state, user) {
	      				var deferred = $q.defer();
	      				if (user.isAuthenticated) {
	      					$state.go('site.accueil');
							deferred.reject(false);
	      				} else {
	      					deferred.resolve(true);
	      				}
	      				return deferred.promise;
	      			}
	      		}
	    	})
	});