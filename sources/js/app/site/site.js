(function(){
	'use strict'

	angular.module('theGame')
		.config([
			'$stateProvider',
			Config
		])
		.directive('isConnected', [
			'UserService',
			IsConnected
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

	function IsConnected(UserService) {
        return {
            restrict: 'A',
            scope: {
            	isConnected: '='
            },
            link: function(scope, elm, attr, ctrl) {
            	var hidde = function() {
        				elm.addClass('hidden');
        			},
        			show = function() {
        				elm.removeClass('hidden');	
        			},
        			defineVisibility = function(isAuthenticated) {
    					if (isAuthenticated === scope.isConnected) {
							show();
    					} else {
    						hidde();
    					}
        			};

        		scope.$watch(function() {
                    return UserService.isAuthenticatedSync();
                }, function(isAuthenticated) {
                    defineVisibility(isAuthenticated);
                });
            }
        }
    }

})();