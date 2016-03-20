(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.login', {
                parent: 'site',
      			url: '/login',
      			views: {
                    'content@': {
        				templateUrl: 'js/app/login/login.html',
      					controller: 'LoginController'
      				}
      			},
                resolve: {
                    login: [
                        '$q',
                        '$state',
                        '$timeout',
                        'UserService',
                        function($q, $state, $timeout, UserService) {
                            var d = $q.defer();
                            UserService.isAuthenticated().then(function(result) {
                                if (!result) {
                                    d.resolve();
                                } else {
                                    $timeout(function() {
                                        $state.go('site.accueil');
                                    }, 0) 
                                    d.reject();
                                }
                            });
                            return d.promise;
                        }
                    ]
                }
    		})
    }

})();