'use strict';

angular.module('myApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'contactCtrl'
  });
}])

.controller('contactCtrl', ['$scope', function($scope) {

  $scope.alertSuccess = false; 

  $scope.deleteAlert = function() {

    //alert("delete alert");
    $scope.alertSuccess = false; 
  }

  /**
   * Sauvegarde un message dans la base de données
   */
  $scope.sendMessage = function(titre, message, qui) {
    
    var timeStamp = Date.now();

    // A post entry.
    var postData = {
      titre: titre,
      date: timeStamp,
      qui: qui,
      message: message
    };

    // Get a key for a new Post.
    var newPostKey = database.ref().child('messages').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/messages/' + newPostKey] = postData;

    $scope.alertSuccess = true; 

    $scope.titre = "";
    $scope.message = "";
    $scope.qui = "";

    return (database.ref().update(updates));
  };
}]);

