(function(){
	'use strict'
	
	angular.module('theGame')
		.factory('SignupService', [
			'$q',
			'SignupResource',
			signupResource
		]);

	function signupResource($q, SignupResource) {

		return {
			signup: function(userInfo) {
				var p = $q.defer();
				SignupResource.signup(userInfo).$promise.then(function(data) {
					p.resolve(data);
				}, function(err) {
					p.reject(err);
				})
				return p.promise;
			}
		}  
	}

})();