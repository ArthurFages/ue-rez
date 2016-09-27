'use strict';

angular.module('myApp.ue', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ue', {
    templateUrl: 'ue/ue.html',
    controller: 'ueCtrl'
  });
}])

.controller('ueCtrl', ['$scope', '$timeout', function($scope, $timeout) {

  // réucpération messages
  $scope.membresUE = [];
  var membresUEData = database.ref('membres-ue');

  //var isFirstCall = true;
  $scope.isLoaded = false;


  var addMembresUE = function(snapshot) {
    console.log("addmembresUE : "+snapshot.val());

    // trickitation
    $timeout(function(){
      $scope.membresUE.push({
        key: snapshot.key,
        value:snapshot.val()
      });
    },0);
    
    //});
  };

  var delMembresUE = function(snapshot) {
    //$scope.$apply(function() {
      $timeout(function(){
        $scope.membresUE.splice(indexOf($scope.membresUE,{
          key: snapshot.key,
          value:snapshot.val()
        }),1);
      },0);
    //});
  };

  var altMembresUE = function() {
    //$scope.$apply(function() {
      $scope.membresUE[$scope.membresUE.indexOf({
        key: snapshot.key,
        value:snapshot.val()
      })-1] = {
        key: snapshot.key,
        value:snapshot.val()
      };
    //});
  };

  membresUEData.on('child_added', function(snapshot) {
    addMembresUE(snapshot);
  });

  membresUEData.on('child_changed', function(snapshot) {
    altMembresUE(snapshot);
  });

  membresUEData.on('child_removed', function(snapshot) {
    delMembresUE(snapshot);
  });


}]);

