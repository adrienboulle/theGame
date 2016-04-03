(function(){
	'use strict'

	angular.module('theGame')
		.factory('LoginService', [
			'$q',
			'$http',
			'LoginResource',
			'UserService',
			loginResource
		]);

	function loginResource($q, $http, LoginResource, UserService) {
	
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
			},
			motDePasseOubli: function(userInfo) {
				var p = $q.defer();
				$http.get('api/forgot/email/' + userInfo.email).then(function(rep) {
					p.resolve(rep.data);
				}, function(err) {
					p.reject(err.data);
				})
				return p.promise;
			}
		}  
  	}
})();