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
                self.name = randomName();
                self.id = id;
                self.msgs = [];
                self.newMsg = '';
                self.sendMsg = function() {
                    if (self.newMsg.length === 0) return;
                    $scope.socket.emit('newMsg', {msg: self.newMsg, room: self.id}, function(err) {
                        if (err) {

                        } else {
                            self.newMsg = '';
                            self.name = randomName();
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
                function randomName() {
                    return Math.floor((Math.random() * 10000000000) + 1);
                }
            }

            $scope.rooms = [
                new $scope.room('Romain'), 
                new $scope.room('Adrien'), 
                new $scope.room('Ca va envoyer du paté'),
                new $scope.room('Romain'), 
                new $scope.room('Adrien'), 
                new $scope.room('Ca va envoyer du paté'),
                new $scope.room('Romain'), 
                new $scope.room('Adrien'), 
                new $scope.room('Ca va envoyer du paté')
            ];

            $scope.currRoom = $scope.rooms[0];

            $scope.socket.on('connected', function(res) {
                $scope.sender = res.user;
            }) 

            $scope.setRoom = function(r) {
                $scope.currRoom = r;
            }

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
        }])
    .directive('deck', [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, elm, attr, ctrl) {
                    $timeout(function() {
                        elm.on('mousemove', function(event) {
                            var n = this.children.length;

                            var left = $('.chat').offset().left - event.pageX;
                            var top = event.pageY - $('.chat').offset().top - 28;
                            
                            var deltaY = 40*Math.exp(-0.5*Math.pow(((75 - left)/35), 2));

                            for (var i = 0; i < n; i++) {
                                var delta = - top + (i + 1)*26 - 15;
                                if (left > 80) left = 80;
                                var h = 144*(1 - (deltaY/45)*Math.exp(-0.5*Math.pow((delta/25), 2)));
                                this.children[i].setAttribute("style","padding-left:" + h + "px;overflow:visible");
                            }                            
                        })
                        elm.on('mouseleave', function() {
                            for (var i = 0; i < this.children.length; i++) {
                                this.children[i].setAttribute("style","");
                            } 
                        })
                    }, 0);
                }
            }
        }]);