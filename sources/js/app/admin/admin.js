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
      			url: '/admin',
      			views: {
                'content@': {
        				    templateUrl: 'js/app/admin/admin.html',
      			        controller: 'AdminController'
      				  }
      			},
            resolve : {
                admin: [
                    '$q',
                    '$state',
                    'UserService',
                    '$timeout',
                    function($q, $state, UserService, $timeout) {
                        var defered = $q.defer();
                        UserService.hasRole(['ROLE_ADM']).then(function(result) {
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