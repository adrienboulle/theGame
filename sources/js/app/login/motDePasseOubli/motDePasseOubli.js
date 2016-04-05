(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.login.motDePasseOubli', {
            parent: 'site.login',
      			url: '/forgot/:email/:token',
      			views: {
                'content@': {
        			      templateUrl: 'js/app/login/motDePasseOubli/motDePasseOubli.html',
      				      controller: 'MotDePasseOubliController'
      				  }
      			}
    		})
    }

})();