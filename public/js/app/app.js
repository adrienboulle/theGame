angular.module('listeCourses', [
	'ngResource',
	'ui.router',
	])
    .controller('listeCourses', function($scope, $resource) {
		
    	$scope.messageAccueil = '--Liste des courses :)';
    	$scope.titre;

		$resource('http://localhost:8085/api/user').get().$promise.then(function(data) {
			$scope.user = data;
    	});

    	$resource('http://localhost:8085/courses').query().$promise.then(function(data) {
			$scope.courses = data;
    	});

		var resources = $resource('http://localhost:8085/courses', {}, {
			save: {
				headers: {
		            'Content-Type': 'application/json'
		        },
				method: 'POST'
			},
			remove: {
				headers: {
		            'Content-Type': 'application/json'
		        },
				method: 'DELETE'
			}
		});

		$scope.add = function() {
			resources.save({}, {'titre': $scope.titre}).$promise.then(function(data) {
				$scope.courses.push(data);	
			}, function() {
				alert('nok !!');
			});
		};

    	$scope.remove = function(id) {
			resources.remove({'id': id}, {'id': id}).$promise.then(function() {
				for (var i = 0; i < $scope.courses.length; i++) {
					if ($scope.courses[i]._id == id) {
						$scope.courses.splice(i, 1);
						return;
					}
				}	
			}, function() {
				alert('nok !!');
			});
		};

	})
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/accueil");
	});
