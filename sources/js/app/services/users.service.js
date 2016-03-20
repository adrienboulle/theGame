(function(){
	'use strict'

	angular.module('theGame')
		.factory('UsersService', [
			'$q',
			'$http',
			'UsersResource',
			usersService
		]);

	function usersService($q, $http, UsersResource) {
	  	  		
  		return {
			getAll: function() {
				// on va appeler le serveur, on renvois donc une promesse
				var p = $q.defer();

				UsersResource.get().$promise.then(function(data) {
					p.resolve(data);
				})
				
				return p.promise;
			},
			toogleActif: function(ids, actif) {
				$http.post('/api/users/actif', {'ids': ids, 'actif': actif})
					.then(function() {
						// todo si ok
					}, function() {
						// todo si nok
					});
			}
		}
	 }

})();