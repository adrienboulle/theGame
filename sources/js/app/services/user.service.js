(function(){
	angular.module('theGame')
		.factory('UserService', [
			'$q',
			'UserResource',
			function($q, UserResource) {
	  		
		  		var user;
				
				return {
					user: function() {
						var p = $q.defer();
						if (user) {
							p.resolve(user);
						} else {
							UserResource.get().then(function(data) {
								user = data;
								p.resolve(user);
							})
						}
						return p.promise;
					},
					login: function(userInfo) {
						var p = $q.defer();
						UserResource.login().then(function(data) {
							user = data;
							p.resolve(user);
						})
						return p.promise;
					}
				}  
	  }]);
})();