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
			removeRole: function(user, role) {
				var p = $q.defer();

				$http.post('/api/users/role/delete', {'id': user._id, 'role': role})
					.then(function() {
						p.resolve();
					}, function() {
						p.reject();
					});
				return p.promise;
			},
			addRole: function(user, role) {
				var p = $q.defer();

				$http.post('/api/users/role/add', {'id': user._id, 'role': role.alias})
					.then(function() {
						p.resolve();
					}, function() {
						p.reject();
					});
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