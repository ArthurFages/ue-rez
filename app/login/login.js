'use strict';

angular.module('myApp.login', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location) {

	    //var ref = new Firebase("https://ue-rez.firebaseio.com");
	    var auth = $firebaseAuth();

      console.log("auth : "+auth);

	    $scope.SignIn = function(event) {
        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;

        console.log("username : "+username);
        console.log("password : "+password);
         
        auth.$signInWithEmailAndPassword(
                username,
                password
            )
            .then(function(user) {
                // Success callback
                console.log('Authentication successful');
                console.log("Signed in as:", user.uid);
                //$location.path("/admin");
            }, function(error) {
                // Failure callback
                console.log('Authentication failure');
                //$location.path("/admin");
            });
      }

}]);
