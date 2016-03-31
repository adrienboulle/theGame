(function(){
	'use strict'

	angular.module('theGame')
		.controller('UsersController', [
			'$scope',
			'$state',
			'LoginService',
			'SignupService',
			'UsersService',
			'UserService',
			'RolesService',
			'user',
			usersController
		])
		.filter('notIn', [
			notInFilter
		])
		.filter('hasRoleSelected', [
			hasRoleSelected
		]);

	function usersController($scope, $state, LoginService, SignupService, UsersService, UserService, RolesService, user) {
		
		$scope.curUser = user;
		$scope.curPage = 1;
		$scope.filtres = new filtres();
		$scope.sort = {
			field: "creation",
			asc: true
		};

		$scope.init = function() {		
			if ($scope.roles) {
				var filtre = new $scope.filtre("roles");
				for (var i = 0; i < $scope.roles.length; i++) {
					if ($scope.roles[i].selected) filtre.add($scope.roles[i]._id);
				}
				if (filtre.data.length > 0) {
					$scope.filtres.set(filtre);
				} else {
					$scope.filtres.unset(filtre);
				}
			}
			if ($scope.usernameFilter !== undefined) {
				var filtre = new $scope.filtre("username");
				filtre.add($scope.usernameFilter);
				if (filtre.data[0].length > 0) {
					$scope.filtres.set(filtre);
				} else {
					$scope.filtres.unset(filtre);
				}
			}
			UsersService.getAll($scope.curPage, $scope.filtres.arr, $scope.sort).then(function(data) {
				$scope.users = data;
			})
			UsersService.getCount($scope.filtres.arr).then(function(data) {
				$scope.nbUsers = data;
			})
		}
	
		RolesService.getAll().then(function(data) {
			if (data[0]) {
				$scope.roles = data;
			}
		})

		$scope.sortField = function(field) {
			if ($scope.sort.field === field) {
				$scope.sort.asc = !$scope.sort.asc;
			} else {
				$scope.sort.field = field;
				$scope.sort.asc = true;
			}
			$scope.init();
		}

		$scope.removeRole = function(user, role) {
			UsersService.removeRole(user, role._id).then(function() {
				$scope.init();
			})
		}

		$scope.addRole = function(user, role) {
			UsersService.addRole(user, role._id).then(function() {
				$scope.init();
			})
		}

		$scope.setActive = function(user, actif) {
			var _back = !user.actif;
			UsersService.toogleActif([user._id], actif).then(function() {

			}, function() {
				user.actif = _back;
			});
		}		

		function filtres() {
			this.arr = [];
			this.set = function(filtre) {
				for (var i = 0; i < this.arr.length; i++) {
					if (this.arr[i].name === filtre.name) {
						return this.arr[i] = filtre;
					}
				}
				this.arr.push(filtre);
			}

			this.unset = function(filtre) {
				for (var i = 0; i < this.arr.length; i++) {
					if (this.arr[i].name === filtre.name) {
						return this.arr.splice(i, 1);
					}
				}
			}
		}

		$scope.filtre = function(name, data) {
			this.name = name;
			this.data = [];
			this.add = function(f) {
				for (var i = 0; i < this.data.length; i++) {
					if (this.data.indexOf(f) !== -1) return;
				}
				this.data.push(f);
			}
		}

		$scope.init();
	}

	function notInFilter() {
		return function(items, array, lvl) {
			var roles = [],
				ids = [],
				inArray = function(item, arr) {
					for (var i = 0; i < arr.length; i++) {
						if (item._id === arr[i]._id) return true;
					}
					return false;
				};
			if (items) {
				for (var i = 0; i < items.length; i++) {
					if (!inArray(items[i], array) && ids.indexOf(items[i]._id) === -1 && items[i].active && (items[i].level >= lvl || lvl === 0)) {
						ids.push(items[i]._id);
						roles.push(items[i]);
					} 
				}
			}
			return roles;
		}
	}		

})();