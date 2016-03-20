(function(){
	'use strict'

	angular.module('theGame')
		.factory('LoginService', [
			'$q',
			'LoginResource',
			'UserService',
			LoginResource
		]);

	function LoginResource($q, LoginResource, UserService) {
	
		return {
			login: function(userInfo) {
				var p = $q.defer();
				LoginResource.login(userInfo).$promise.then(function(data) {
					UserService.init();
					p.resolve(data);
				}, function(err) {
					p.reject(err);
				})
				return p.promise;
			},
			logout: function() {
				var p = $q.defer();
				LoginResource.logout().$promise.then(function(data) {
					UserService.init()
  					p.resolve(true);
				})
				return p.promise;
			}
		}  
  	}
})();