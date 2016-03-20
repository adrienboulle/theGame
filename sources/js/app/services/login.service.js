(function(){
	'use strict'

	angular.module('theGame')
		.factory('LoginService', [
			'$q',
			'LoginResource',
			'UserService',
			loginResource
		]);

	function loginResource($q, LoginResource, UserService) {
	
		return {
			login: function(userInfo) {
				var p = $q.defer();
				LoginResource.login(userInfo).$promise.then(function(rep) {
					UserService.init();
					p.resolve(rep.data);
				}, function(err) {
					p.reject(err.data);
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