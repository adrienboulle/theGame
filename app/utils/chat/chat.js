'use strict';

angular
    .module('Chat', []) 
    .controller('chat', function($scope){
        
        $scope.msgs = [];

        $scope.socket = io.connect('http://localhost:8085');

        $scope.socket.on('newMsg', function(msg) {
            $scope.msgs.push(msg);
            $scope.$apply();
        })

        $scope.sendMsg = function() {
            $scope.socket.emit('newMsg', $scope.newMsg);
        }
      
    });