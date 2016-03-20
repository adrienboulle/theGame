(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.accueil', {
                parent: 'site',
      			url: '/accueil',
      			views: {
                'content@': {
        				templateUrl: 'js/app/accueil/accueil.html',
      					controller: 'AccueilController'
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
                                if (result) {
                                    d.resolve();
                                } else {
                                    $timeout(function() {
                                        $state.go('site.login');
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