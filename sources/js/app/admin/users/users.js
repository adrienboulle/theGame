(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.admin.users', {
                parent: 'site.admin',
      			url: '/users',
      			views: {
                'content@': {
        				templateUrl: 'js/app/admin/users/users.html',
      			        controller: 'UsersController'
      				}
      			}
    		})
    }

})();