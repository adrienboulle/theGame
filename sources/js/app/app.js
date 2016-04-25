(function(){
	'use strict'
	
	angular.module('theGame', [
		'ngResource',
		'ui.router',
		'ui.bootstrap',
		'ngMaterial',
		'ngAnimate',
		'ngMessages',
		'chat'
		])
	angular.module('theGame')
		.config([
			'$stateProvider',
			'$urlRouterProvider',
			'$locationProvider',
			'$mdThemingProvider',
			Config
		]);

	function Config($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
		

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise(function($injector, $location) {
			var $state = $injector.get('$state');
			$state.go('site.accueil');
		})

	}

})();