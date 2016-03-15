(function(){
	angular.module('theGame')
		.factory('LoginService', [
			'$q',
			'LoginResource',
			LoginResource
		]);

	function LoginResource($q, LoginResource) {
	
  		var user = {
  			isAuthenticated: false,
  			name: undefined
  		}
		
		return {
			currentUser: function() {
				var p = $q.defer();
				if (user.isAuthenticated) {
					p.resolve(user);
				} else {
					LoginResource.get().$promise.then(function(data) {
						if (data.isAuthenticated) {
							user.isAuthenticated = true,
							user.name = data.user.username;
						}

						p.resolve(user);
					})
				}
				return p.promise;
			},
			login: function(userInfo) {
				var p = $q.defer();
				LoginResource.login(userInfo).$promise.then(function(data) {
					p.resolve(data);
				}, function(err) {
					p.reject(err);
				})
				return p.promise;
			},
			logout: function() {
				var p = $q.defer();
				LoginResource.logout().$promise.then(function(data) {
					user = {
			  			isAuthenticated: false,
			  			name: undefined
  					}
  					p.resolve(true);
				})
				return p.promise;
			}
		}  
  	}
})();