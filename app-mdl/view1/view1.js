'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

    var config = {
      apiKey: "AIzaSyCE4UQo4a6h0FW6m4_GDns_b8bzKDV2tCM",
      authDomain: "ue-rez.firebaseapp.com",
      databaseURL: "https://ue-rez.firebaseio.com",
      storageBucket: "ue-rez.appspot.com"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var item1 = database.ref('items/item1');
    item1.on('value', function(snapshot) {
    	// stuff to do if change on item 1
    	$scope.$apply(function() {
        $scope.data = snapshot.val();
      });
    });

    //$scope.data = item1;
}]);

