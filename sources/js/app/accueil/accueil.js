(function(){
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
      			}
    		})
	}

})();