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
                self.id = id;
                self.msgs = [];
                self.newMsg = '';
                self.sendMsg = function() {
                    if (self.newMsg.length === 0) return;
                    $scope.socket.emit('newMsg', {msg: self.newMsg, room: self.id}, function(err) {
                        if (err) {

                        } else {
                            self.newMsg = '';
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

        }]);