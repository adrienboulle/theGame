'use strict';

angular
    .module('Chat', []) 
    .controller('chat', function($scope){
        
        $scope.msgs = [];

        $scope.socket = io.connect('/');

        $scope.socket.on('newMsg', function(msg) {
            $scope.msgs.push(msg);
            $scope.$apply();
        })

        $scope.sendMsg = function() {
            $scope.socket.emit('newMsg', $scope.newMsg);
        }
      
    });