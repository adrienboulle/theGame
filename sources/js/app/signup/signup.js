(function(){
	angular.module('theGame')
		.config([
			'$stateProvider',
			function($stateProvider) {
				$stateProvider
			    	.state('site.signup', {
			    		parent: 'site',
			      		url: '/signup',
			      		views: {
			        		"content@": {
			        			templateUrl: 'js/app/signup/signup.html',
			      				controller: 'SignupController'
			        		}
			      		},
			      		resolve: {
			      			authenticated: [
			      				'$q', 
			      				'$state', 
			      				'user', 
			      				function($q, $state, user) {
				      				var deferred = $q.defer();
				      				if (user.isAuthenticated) {
				      					$state.go('site.accueil');
										deferred.reject(false);
				      				} else {
				      					deferred.resolve(true);
				      				}
				      				return deferred.promise;
				      			}]
			      		}
			    	})
			}]);
})();