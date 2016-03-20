(function(){
    'use strict'

    angular.module('theGame')
        .directive('hasRole', [
            'UserService', 
            hasRole
        ])
        .directive('isAuth', [
            'UserService', 
            isAuth
        ])

    function hasRole(UserService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var setHidden = function () {
                        element.remove();
                    },
                    defineVisibility = function (reset) {
                        UserService.hasRole(roles).then(function(result) {
                            if (!result) {
                                setHidden();
                            }
                        });
                    },
                    roles = attrs.hasRole.replace(/\s+/g, '').split(';');

                if (roles.length > 0) {
                    defineVisibility();
                }
            }
        };
    }

    function isAuth(UserService) {
        return {
            restrict: 'A',
            scope: {
                rule: '=isAuth'
            },
            link: function (scope, element, attrs) {
                var setHidden = function () {
                        element.remove();
                    },
                    defineVisibility = function () {
                        UserService.isAuthenticated().then(function(result) {
                            if (result !== scope.rule) {
                                setHidden();
                            }
                        });
                    }

                defineVisibility();
            }
        };
    }


})();