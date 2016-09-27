'use strict';



// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.view1',
  'myApp.view2',
  'myApp.accueil',
  'myApp.contact',
  'myApp.credits',
  'myApp.info',
  'myApp.matos',
  'myApp.version',
  'myApp.admin',
  'myApp.ue',
  'myApp.login'
]);

// connexion BDD
var config = {
  apiKey: "AIzaSyCE4UQo4a6h0FW6m4_GDns_b8bzKDV2tCM",
  authDomain: "ue-rez.firebaseapp.com",
  databaseURL: "https://ue-rez.firebaseio.com",
  storageBucket: "ue-rez.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();

app.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    var auth = $firebaseAuth();
    console.log("auth : "+auth);
    return auth;
  }
]);

app.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/accueil");
  }
});
}]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
        .when('/accueil', {
            templateUrl: 'accueil/accueil.html',
            controller: 'accueilCtrl'
        })
        .when('/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'contactCtrl'
        })
        .when('/credits', {
            templateUrl: 'credits/credits.html',
            controller: 'creditsCtrl'
        })
        .when('/info', {
            templateUrl: 'info/info.html',
            controller: 'infoCtrl'
        })
        .when('/matos', {
            templateUrl: 'matos/matos.html',
            controller: 'matosCtrl'
        })
        .when('/admin', {
            templateUrl: 'admin/admin.html',
            controller: 'adminCtrl',
            /*resolve: {
              "currentAuth": ["Auth", function(Auth) {
                console.log("Auth : "+Auth);
                return Auth.$waitForAuth();
              }]
            }*/
        })
        .when('/UE', {
            templateUrl: 'ue/ue.html',
            controller: 'ueCtrl'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
        .otherwise({redirectTo: '/accueil'});
}]);



app.controller("SampleController", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    // faire qqc avec ce qui est renvoyé de firebase array
  }
]);

app.controller("indexController", ["$scope",
  function($scope) {
    // navigation
    $scope.isAccueilActive = "active";
    $scope.isInfoActive = "";
    $scope.isMatosActive = "";
    $scope.isContactActive = "";
    $scope.isUEActive = "";

    function setIsActive(accueil, info, matos, contact, ue) {
      $scope.isAccueilActive = accueil;
      $scope.isInfoActive = info;
      $scope.isMatosActive = matos;
      $scope.isContactActive = contact;
      $scope.isUEActive = ue;
    }

    $scope.setAccueilActif = function() {
      setIsActive("active", "", "", "", "");
    }

    $scope.setInfoActif = function() {
      setIsActive("", "active", "", "", "");
    }

    $scope.setMatosActif = function() {
      setIsActive("", "", "active", "", "");
    }

    $scope.setContactActif = function() {
      setIsActive("", "", "", "active", "");
    }

    $scope.setUEActif = function() {
      setIsActive("", "", "", "", "active");
    }

    $('.nav-collapse').click('li', function() {
    $('.nav-collapse').collapse('hide');
});
  }
]);








