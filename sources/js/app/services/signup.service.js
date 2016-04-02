(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('SignupService', [
			'$q',
			'SignupResource',
			'$http',
			signupResource
		]);

	function signupResource($q, SignupResource, $http) {

		return {
			signup: function(userInfo) {
				var p = $q.defer();
				SignupResource.signup(userInfo).$promise.then(function(rep) {
					p.resolve(rep.data);
				}, function(err) {
					p.reject(err);
				})
				return p.promise;
			},
			validate: function(token) {
				var p = $q.defer();
				$http.get('/api/signup/valid/' + token).then(function(rep) {
					p.resolve(rep.data);
				}, function(rep) {
					p.reject(rep.data);
				})
				return p.promise;
			},
			testUsername: function(username) {
				var p = $q.defer();
				$http.get('/api/signup/username/' + username).then(function(rep) {
					p.resolve(rep.data.exists);
				})
				return p.promise;
			},
			testEmail: function(email) {
				var p = $q.defer();
				$http.get('/api/signup/email/' + email).then(function(rep) {
					p.resolve(rep.data.exists);
				})
				return p.promise;
			}
		}  
	}

})();