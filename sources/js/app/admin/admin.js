(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.admin', {
                parent: 'site',
          		abstract: true,
                resolve : {
                    admin: [
                        '$q',
                        '$state',
                        'UserService',
                        '$timeout',
                        function($q, $state, UserService, $timeout) {
                            var defered = $q.defer();
                            UserService.hasLevel(10).then(function(result) {
                                if (result) {
                                    return defered.resolve(true);
                                } else {
                                    $timeout(function() {
                                      $state.go('site.accueil');
                                    }, 0);
                                    defered.reject();
                                }
                            })
                            return defered.promise;   
                        }
                    ]
                }
    		})
    }

})();