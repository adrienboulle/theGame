'use strict';

angular
    .module('Chat', []) 
    .controller('chat', [
        '$scope',
        '$timeout',
        function($scope, $timeout) {
        
            $scope.socket = io.connect('/');

            $scope.room = function(id) {
                var self = this;
                $scope.socket.emit('join', {room: id});
                self.name = Math.floor((Math.random() * 10000000000) + 1);
                self.id = id;
                self.msgs = [];
                self.newMsg = '';
                self.sendMsg = function() {
                    if (self.newMsg.length === 0) return;
                    $scope.socket.emit('newMsg', {msg: self.newMsg, room: self.id}, function(err) {
                        if (err) {

                        } else {
                            self.newMsg = '';
                            self.name = Math.floor((Math.random() * 10000000000) + 1);
                        }
                        $scope.$apply();
                    });
                }
                self.addMsg = function(msg) {
                    self.msgs.push(msg);
                    $timeout(function() {
                        $('#' + self.id).mCustomScrollbar('scrollTo', "bottom", {scrollInertia: 100});
                    }, 0)
                }
            }

            $scope.rooms = [new $scope.room('r1')];

            $scope.socket.on('connected', function(res) {
                $scope.sender = res.user;
            }) 

            $scope.socket.on('newMsg', function(msg) {
                for (var i = 0; i < $scope.rooms.length; i++) {
                    if ($scope.rooms[i].id === msg.room) {
                        $scope.rooms[i].addMsg(msg);
                        $scope.$apply();
                        return;
                    }
                }
            })   

        }])
    .directive('spanW', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, elm, attr, ctrl) {
                    $timeout(function() {
                        var w = elm[0].children[0].offsetWidth;
                        elm[0].setAttribute("style","width:" + w + "px");
                    }, 0);
                }
            }
        }]);