'use strict';

angular.module('myApp.accueil', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/accueil', {
    templateUrl: 'accueil/accueil.html',
    controller: 'accueilCtrl'
  });
}])

.controller('accueilCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.messages = [];
    var messagesData = database.ref('messages-ue');

    var addMessage = function(snapshot) {
      console.log("addmessage : "+snapshot.val());

      // trickitation
      $timeout(function(){
        $scope.messages.push({
          key: snapshot.key,
          value:snapshot.val()
        });
      },0);
      
      //});
    };

    var indexOf = function(tab, item) {
      var i = 0
      for(; i<tab.length && tab[i].key != item.key; i++);
      return i==tab.length?-1:i;
    };

    var delMessage = function(snapshot) {
      //$scope.$apply(function() {
        $timeout(function(){
          $scope.messages.splice(indexOf($scope.messages,{
            key: snapshot.key,
            value:snapshot.val()
          }),1);
        },0);
      //});
    };

    var altMessage = function() {
      //$scope.$apply(function() {
        $scope.messages[$scope.messages.indexOf({
          key: snapshot.key,
          value:snapshot.val()
        })-1] = {
          key: snapshot.key,
          value:snapshot.val()
        };
      //});
    };

    messagesData.on('child_added', function(snapshot) {
      addMessage(snapshot);
    });

    messagesData.on('child_changed', function(snapshot) {
      altMessage(snapshot);
    });

    messagesData.on('child_removed', function(snapshot) {
      delMessage(snapshot);
    });

    //$scope.data = item1;
}]);

