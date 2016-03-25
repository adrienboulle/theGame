(function(){
	'use strict'

	angular.module('theGame')
		.factory('RolesService', [
			'$q',
			'$http',
			'RolesResource',
			rolesService
		]);

	function rolesService($q, $http, RolesResource) {
	  	  		
  		return {
			getAll: function() {
				// on va appeler le serveur, on renvois donc une promesse
				var p = $q.defer();

				RolesResource.get().$promise.then(function(data) {
					p.resolve(data);
				})
				
				return p.promise;
			},
		}
	 }

})();