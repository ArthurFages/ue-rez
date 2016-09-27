'use strict';

angular.module('myApp.matos', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/matos', {
    templateUrl: 'matos/matos.html',
    controller: 'matosCtrl'
  });
}])

.controller('matosCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    $scope.alertError = false;
    $scope.alertSuccess = false; 

    $scope.deleteAlert = function() {

      //alert("delete alert");
      $scope.alertError = false;
      $scope.alertSuccess = false; 
    }

    var idDemande = 0;
    $scope.demandes = [];

    $scope.categories = [];
    var categoriesData = database.ref('matos');

    /**
     * Base de données management
     */

    var addCategorie = function(snapshot) {
      console.log("addmessage : "+snapshot.val());

      // trickitation
      $timeout(function(){
        $scope.categories.push({
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

    var delCategorie = function(snapshot) {
      //$scope.$apply(function() {
        $timeout(function(){
          $scope.categories.splice(indexOf($scope.categories,{
            key: snapshot.key,
            value:snapshot.val()
          }),1);
        },0);
      //});
    };

    var altCategorie = function() {
      //$scope.$apply(function() {
        $scope.categories[$scope.categories.indexOf({
          key: snapshot.key,
          value:snapshot.val()
        })-1] = {
          key: snapshot.key,
          value:snapshot.val()
        };
      //});
    };

    categoriesData.on('child_added', function(snapshot) {
      addCategorie(snapshot);
    });

    categoriesData.on('child_changed', function(snapshot) {
      altCategorie(snapshot);
    });

    categoriesData.on('child_removed', function(snapshot) {
      delCategorie(snapshot);
    });

    /**
     * Demandes management
     */
    $scope.deleteDemande = function(demande) {
      $scope.demandes.splice(indexOf($scope.demandes,demande),1);
    }
    $scope.addDemande = function(demande) {
      $scope.demandes.push({id:idDemande,demande:demande});
      idDemande ++;
    }






    /**
     * Sauvegarde un message dans la base de données
     */
    $scope.sendDemande = function(bucque, chambre, tel, mail, date) {

      if (bucque==undefined || chambre==undefined || tel==undefined || mail==undefined || date==undefined
        || bucque=="" || chambre=="" || tel=="" || mail=="" || date=="") {
        /*try {
          var snackbarContainer = document.querySelector('#demo-snackbar-example');
          var data = {
            message: 'Tout les champs doivent être remplis',
            timeout: 2000,
            actionText: "Ok ta macar's"
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        } catch (e) {
          console.log("le navigateur fait de la merde");
        }*/

        //alert("send demande error");

        $scope.alertError = true;



      } else {
        var timeStamp = Date.now();

        // A post entry.
        var postData = {
          bucque: bucque,
          dateDemande: timeStamp,
          chambre: chambre,
          tel: tel,
          mail: mail,
          dateSouhaitee: date
        };

        //,
          //quoi: $scope.demandes

        // Get a key for a new Post.
        var newPostKey = database.ref().child('demandes').push().key;

        console.log(newPostKey);

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/demandes/' + newPostKey] = postData;

        var return_value = (database.ref().update(updates));

        /*try {
          var snackbarContainer = document.querySelector('#demo-snackbar-example');
          var data = {
            message: 'Demande envoyée',
            timeout: 2000,
            actionText: "Ok ta macar's"
          };
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        } catch (e) {
          console.log("le navigateur fait de la merde");
        }*/

        $scope.alertSuccess = true;
        //alert("send demande success");
        

        $scope.bucque = "";
        $scope.mail = "";
        $scope.tel = "";
        $scope.date = "";
        $scope.chambre = "";
        $scope.demandes = [];
      }

      
      
    };



    //$scope.data = item1;
}]);

