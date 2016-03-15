(function(){
	angular.module('theGame', [
		'ngResource',
		'ui.router'
		])
	angular.module('theGame', ['ngResource','ui.router'])
		.config([
			'$stateProvider',
			'$urlRouterProvider',
			'$locationProvider',
			Config
		]);

	function Config($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/accueil");
	}

})();