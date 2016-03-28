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
				SignupResource.signup(userInfo).$promise.then(function(data) {
					p.resolve(data);
				}, function(err) {
					p.reject(err);
				})
				return p.promise;
			},
			testUsername: function(username) {
				var p = $q.defer();
				$http.get('/api/signup/' + username).then(function(rep) {
					p.resolve(rep.data.exists);
				})
				return p.promise;
			}
		}  
	}

})();