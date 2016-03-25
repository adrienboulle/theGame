(function(){
    'use strict'

    angular.module('theGame')
        .directive('role', [
            'RolesService',
            role
        ])
        .controller('RoleController', [
            'RolesService',
            RoleController
        ]);

    function role(RolesService) {
        return {
            restrict: 'A',
            templateUrl: 'js/app/components/role/role.html',
            controller: 'RoleController',
            scope: {
                role: '='
            },
            link: function (scope, element, attrs) {
                
            }
        }
    }

    function RoleController($scope) {
        $scope.panel = false;
    }


})();