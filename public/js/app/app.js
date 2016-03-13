angular.module('listeCourses', [
	'ngResource',
	'ui.router'
	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/accueil");
	});
