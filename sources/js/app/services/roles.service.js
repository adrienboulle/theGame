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
				var p = $q.defer();
				
				RolesResource.get().$promise.then(function(data) {
					p.resolve(data);
				})
				return p.promise;
			},
			getSupEgal: function(lvl) {
				var _self = this,
					_rolesSupEgal = [],
					_p = $q.defer();

				_self.getAll().then(function(roles) {
					for (var i = 0; i < roles.length; i++) {
						if (roles[i].level >= lvl) {
							_rolesSupEgal.push(roles[i]);
						}
					}
					_p.resolve(_rolesSupEgal);
				})
				return _p.promise;      
			},
		}
	 }

})();