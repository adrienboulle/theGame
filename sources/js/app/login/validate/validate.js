(function(){
    'use strict'

    angular.module('theGame')
		    .config([
            '$stateProvider',
            Config
		    ]);

    function Config($stateProvider) {
		$stateProvider
    		.state('site.login.validate', {
            parent: 'site.login',
      			url: '/validate/:token',
      			views: {
                'content@': {
        			      templateUrl: 'js/app/login/validate/validate.html',
      				      controller: 'ValidateController'
      				  }
      			}
    		})
    }

})();