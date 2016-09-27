'use strict';

angular.module('myApp.info', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/info', {
    templateUrl: 'info/info.html',
    controller: 'infoCtrl'
  });
}])

.controller('infoCtrl', ['$scope', function($scope) {


    //$scope.data = item1;
}]);

