(function(){
	'use strict'
	
	angular.module('theGame', [
		'ngResource',
		'ui.router',
		'ngMaterial',
		'ngAnimate',
		'ngMessages'
		])
	angular.module('theGame')
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