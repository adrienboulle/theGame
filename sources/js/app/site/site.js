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
		])
		.controller('ChatController', [
			'$scope',
			'$timeout',
			ChatController
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
            link: function(scope, elm, attr, ctrl) {
            	var hidde = function() {
        				elm.addClass('hidden');
        			},
        			show = function() {
        				elm.removeClass('hidden');	
        			},
        			defineVisibility = function(isAuthenticated) {
    					if (isAuthenticated === isConnected) {
							show();
    					} else {
    						hidde();
    					}
        			},
        			isConnected = !!attr.isConnected;


        		scope.$watch(function() {
                    return UserService.isAuthenticatedSync();
                }, function(isAuthenticated) {
                    defineVisibility(isAuthenticated);
                });
            }
        }
    }

    function ChatController($scope, $timeout) {
        $timeout(function() {
        	$scope.rooms = ['Adrien', 'Romain', 'Thierry', 'Balalabouuubiiiiiiiii'];
    	}, 100);
    }

})();