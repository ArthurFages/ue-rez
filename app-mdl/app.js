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
  'myApp.ue'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
            controller: 'adminCtrl'
        })
        .when('/UE', {
            templateUrl: 'ue/ue.html',
            controller: 'ueCtrl'
        })
        .otherwise({redirectTo: '/accueil'});
}]);

app.controller("SampleController", ["$scope", "$firebaseArray",
  function($scope, $firebaseArray) {
    // faire qqc avec ce qui est renvoyé de firebase array
  }
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

