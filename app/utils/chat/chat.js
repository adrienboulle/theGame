'use strict';

angular
    .module('Chat', []) 
    .controller('chat', function($scope){
        
        $scope.msgs = [];
        $scope.sender = Math.floor((Math.random() * 100000) + 1);

        $scope.socket = io.connect('/');

        $scope.socket.on('newMsg', function(msg) {
            $scope.msgs.push(msg);
            $scope.$apply();
        })

        $scope.sendMsg = function() {
            if ($scope.newMsg.length === 0) return;
            $scope.socket.emit('newMsg', {msg: $scope.newMsg, sender: $scope.sender}, function(err) {
                if (err) {

                } else {
                    $scope.newMsg = '';
                }
                $scope.$apply();
            });
        }
      
    });