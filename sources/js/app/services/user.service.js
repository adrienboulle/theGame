(function(){
	'use strict'

	angular.module('theGame')
		.factory('UserService', [
			'$q',
			'UserResource',
			'LoginResource',
			'RolesService',
			userService
		]);

	function userService($q, UserResource, LoginResource, RolesService) {
	  	
	  	// variables qui seront tout le temps accessibles
  		var user,
  			authenticated,
  			cache,
  			init = function() {
  				authenticated = undefined;
  				user = undefined;
  			};

  		// on initie les variables
  		init();
  		
  		return {
  			// remet à 0 le service (ie. si login ou logout)
			init: function() {
				init();
			},
			// acces à l'utilisateur connecté
			user: function() {
				// on va appeler le serveur, on renvois donc une promesse
				var p = $q.defer();

				if (user) {
					// si user est défini, alors on a déjà reçu la réponse du serveur
					// on resolve directement
					p.resolve(user);
				} else if (cache) {
					// cache est défini, alors un appel au serveur est en cours,
					// on renvois donc la promesse cache
					p = cache;
				} else {
					// sinon, on va faire un appel au serveur pour nous renvoyer l'utilisateur en session
					// pour éviter de faire plusieurs appels, on va mettre en cache la promesse 
					// pour la partager entre les appels au service
					cache = p;
					LoginResource.get().$promise.then(function(data) {
						// en fonciton de la réponse du serveur, on renseigne les variables
						if (data.isAuthenticated) {
							authenticated = true;
							user = data.user;
						} else {
							authenticated = false;
							user = {};
						}
						// on resolve et on met cache à undefined car il n'y a plus d'appel au serveur en attente
						p.resolve(user);
						cache = undefined;
					})
				}
				return p.promise;
			},
			// retourne les roles de l'utilisateur connecté avec le meilleur level (le plus bas)
			bestRoles: function() {
				var _self = this,
					_p = $q.defer(),
					_bestRoles = [];


				_self.user().then(function() {
					if (authenticated && user.roles) {
						for (var i = 0; i < user.roles.length; i++) {
							if (user.roles[i].level === user.level) {
								_bestRoles.push(user.roles[i]);		
							}
						}
						_p.resolve(_bestRoles);
					} else {
						_p.resolve([]);
					}
				})
				return _p.promise;
			},
			hasLevel: function(lvl) {
				var _self = this,
					_p = $q.defer();


				// on appel la méthode .user de ce service pour éviter d'avoir à gérer les appels au serveur
				// si jamais user n'est pas encore resolved
				_self.user().then(function() {
					// à ce moment les variabmes authenticated et user sont nécessairement définies 
					if (authenticated && user.level !== undefined) {
						if (user.level <= lvl) {
							_p.resolve(true);
						} else {
							_p.resolve(false);	
						}
					} else {
						_p.resolve(false);
					}
				})
				return _p.promise;
			},
			hasRole: function(roles) {
				var _self = this,
					_p = $q.defer(),
					_hasRole = function(roles) {
						for (var i = 0; i < roles.length; i++) {
							for (var j = 0; j < user.roles.length; j++) {
								if (user.roles[j]._id === roles[i]._id) {
									return true;
								}
							}
						}
						return false;
					};


				// on appel la méthode .user de ce service pour éviter d'avoir à gérer les appels au serveur
				// si jamais user n'est pas encore resolved
				_self.user().then(function() {
					// à ce moment les variabmes authenticated et user sont nécessairement définies 
					if (authenticated && user.roles) {
						if (_hasRole(roles)) {
							_p.resolve(true);
						} else {
							_p.resolve(false);	
						}
					} else {
						_p.resolve(false);
					}
				})
				return _p.promise;                      
			},
			isAuthenticated: function() {
				var _self = this,
					_p = $q.defer();


				// on appel la méthode .user de ce service pour éviter d'avoir à gérer les appels au serveur
				// si jamais user n'est pas encore resolved
				_self.user().then(function() {
					// à ce moment les variables authenticated et user sont nécessairement définies 
					if (authenticated === true) {
						_p.resolve(true);
					} else {
						_p.resolve(false);
					}
				})
				return _p.promise;       
			},
			isAuthenticatedSync: function() {
				return authenticated;
			}

		}
	 }

})();