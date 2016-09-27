'use strict';

/*

VALEUR UNIQUE DANS LA BDD

return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = snapshot.val().username;
  // ...
});

*/

angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'admin/admin.html',
    controller: 'adminCtrl'
  });
}])

.controller('adminCtrl', ['$scope', '$timeout', function($scope, $timeout) {

  //
  // FONCTION UTILITAIRES
  //


  var indexOf = function(tab, item) {
    var i = 0
    for(; i<tab.length && tab[i].key != item.key; i++);
    return i==tab.length?-1:i;
  };


  //
  // MESSAGES UE
  //
    
    
  // réucpération messages
  $scope.messagesUE = [];
  var messagesDataUE = database.ref('messages-ue');

  //var isFirstCall = true;
  $scope.isLoaded = false;


  var addMessageUE = function(snapshot) {
    console.log("addmessage : "+snapshot.val());

    // trickitation
    $timeout(function(){
      $scope.messagesUE.push({
        key: snapshot.key,
        value:snapshot.val()
      });
    },0);
    
    //});
  };


  var delMessageUE = function(snapshot) {
    //$scope.$apply(function() {
      $timeout(function(){
        $scope.messagesUE.splice(indexOf($scope.messagesUE,{
          key: snapshot.key,
          value:snapshot.val()
        }),1);
      },0);
    //});
  };

  var altMessageUE = function() {
    //$scope.$apply(function() {
      $scope.messagesUE[$scope.messagesUE.indexOf({
        key: snapshot.key,
        value:snapshot.val()
      })-1] = {
        key: snapshot.key,
        value:snapshot.val()
      };
    //});
  };

  messagesDataUE.on('child_added', function(snapshot) {
    addMessageUE(snapshot);
  });

  messagesDataUE.on('child_changed', function(snapshot) {
    altMessageUE(snapshot);
  });

  messagesDataUE.on('child_removed', function(snapshot) {
    delMessageUE(snapshot);
  });

  /**
   * Sauvegarde un message dans la base de données
   */
  $scope.saveMessage = function(titre, message, lien) {
    
    var timeStamp = Date.now();

    // A post entry.
    var postData = {
      titre: titre,
      date: timeStamp,
      link: lien,
      message: message
    };

    // Get a key for a new Post.
    var newPostKey = database.ref().child('messages-ue').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/messages-ue/' + newPostKey] = postData;

    return (database.ref().update(updates));
  };

  /** 
   * Supprime un message dans la base de données
   */
  $scope.deleteMessageUE = function(message) {
    database.ref('/messages-ue/'+message.key).remove();
  };

  console.log($scope.messagesUE);

  /**
   * Loading stuffs
   */
  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    $scope.isLoaded = false;
  });








  //
  // CATEGORIES
  //
    
    
  // réucpération messages
  $scope.categories = [];
  var categoriesData = database.ref('matos');

  //var isFirstCall = true;
  $scope.isLoaded = false;


  var addcategorie = function(snapshot) {
    console.log("addcategorie : "+snapshot.val());

    // trickitation
    $timeout(function(){
      $scope.categories.push({
        key: snapshot.key,
        value:snapshot.val()
      });
    },0);
    
    //});
  };

  var delcategorie = function(snapshot) {
    //$scope.$apply(function() {
      $timeout(function(){
        $scope.categories.splice(indexOf($scope.categories,{
          key: snapshot.key,
          value:snapshot.val()
        }),1);
      },0);
    //});
  };

  var altcategorie = function() {
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
    addcategorie(snapshot);
  });

  categoriesData.on('child_changed', function(snapshot) {
    altcategorie(snapshot);
  });

  categoriesData.on('child_removed', function(snapshot) {
    delcategorie(snapshot);
  });

  /**
   * Sauvegarde une categorie dans la base de données
   */
  $scope.saveCategorie = function(nom, qte) {

    // A post entry.
    var postData = {
      nom: nom,
      qteTotale: qte,
      qteEmpruntee: 0
    };

    // Get a key for a new Post.
    var newPostKey = database.ref().child('matos').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/matos/' + newPostKey] = postData;

    return (database.ref().update(updates));
  };

  /** 
   * Supprime un message dans la base de données
   */
  $scope.deleteCategorie = function(categorie) {
    database.ref('/matos/'+categorie.key).remove();
  };

  console.log($scope.categories);










  //
  // DEMANDES
  //
    
    
  // réucpération messages
  $scope.demandes = [];
  var demandesData = database.ref('demandes');

  //var isFirstCall = true;
  $scope.isLoaded = false;


  var addDemande = function(snapshot) {
    console.log("adddemande : "+snapshot.val());

    // trickitation
    $timeout(function(){
      $scope.demandes.push({
        key: snapshot.key,
        value:snapshot.val()
      });
    },0);
    
    //});
  };

  var delDemande = function(snapshot) {
    //$scope.$apply(function() {
      $timeout(function(){
        $scope.demandes.splice(indexOf($scope.demandes,{
          key: snapshot.key,
          value:snapshot.val()
        }),1);
      },0);
    //});
  };

  var altDemande = function() {
    //$scope.$apply(function() {
      $scope.demandes[$scope.demandes.indexOf({
        key: snapshot.key,
        value:snapshot.val()
      })-1] = {
        key: snapshot.key,
        value:snapshot.val()
      };
    //});
  };

  demandesData.on('child_added', function(snapshot) {
    addDemande(snapshot);
  });

  demandesData.on('child_changed', function(snapshot) {
    altDemande(snapshot);
  });

  demandesData.on('child_removed', function(snapshot) {
    delDemande(snapshot);
  });

  /**
   * Sauvegarde un message dans la base de données
   *
  $scope.saveCategorie = function(nom, qte) {

    // A post entry.
    var postData = {
      nom: nom,
      qteTotale: qte,
      qteEmpruntee: 0
    };

    // Get a key for a new Post.
    var newPostKey = database.ref().child('matos').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/matos/' + newPostKey] = postData;

    return (database.ref().update(updates));
  };*/

  /** 
   * Valide une demande
   */
  $scope.validateDemande = function(demande, identifiants) {

    $scope.showIdentification = false;

    console.log("demande for identification : "+demande);
    console.log("identifiants : "+identifiants);

    // on enregistre un emprunt par identifiant

    // passe la demande en en cours
    var data = demande.value;

    for(var i=0; i<identifiants.length;i++) {

      data.identifiant = identifiants[i].value;
      var postData = data;

      // Get a key for a new Post.
      var newPostKey = database.ref().child('enCours').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/enCours/' + newPostKey] = postData;

      var pushResult = database.ref().update(updates);

    }
    

    // supprime la demande
    database.ref('/demandes/'+demande.key).remove();
  };






  //
  // IDENTIFICATION MATERIEL DEMANDE
  //


  $scope.showIdentification = false;
  $scope.demandeForIdentifiaction = 0;
  var idIdentifiant = 0;
  $scope.identifiants = [];

  $scope.validateIdentification = function(demande) {

    $scope.showIdentification = true;
    $scope.demandeForIdentifiaction = demande;
  }

  $scope.addIdentifiant = function(identifiant) {
    $scope.id="";
    $scope.identifiants.push({id:idIdentifiant, value:identifiant});
    idIdentifiant++;
    focus(id);
  }

  $scope.delIdentifiant = function(identifiant) {
    $scope.identifiants.splice(
      indexOf($scope.identifiants,identifiant),1);
  }













  //
  // EMPRUNTS
  //
    
    
  // réucpération messages
  $scope.emprunts = [];
  var empruntsData = database.ref('enCours');

  //var isFirstCall = true;
  $scope.isLoaded = false;


  var addEmprunt = function(snapshot) {
    console.log("addEmprunt : "+snapshot.val());

    // trickitation
    $timeout(function(){
      $scope.emprunts.push({
        key: snapshot.key,
        value:snapshot.val()
      });
    },0);
    
    //});
  };

  var delEmprunt = function(snapshot) {
    //$scope.$apply(function() {
      $timeout(function(){
        $scope.emprunts.splice(indexOf($scope.emprunts,{
          key: snapshot.key,
          value:snapshot.val()
        }),1);
      },0);
    //});
  };

  var altEmprunt = function() {
    //$scope.$apply(function() {
      $scope.emprunts[$scope.emprunts.indexOf({
        key: snapshot.key,
        value:snapshot.val()
      })-1] = {
        key: snapshot.key,
        value:snapshot.val()
      };
    //});
  };

  empruntsData.on('child_added', function(snapshot) {
    addEmprunt(snapshot);
  });

  empruntsData.on('child_changed', function(snapshot) {
    altEmprunt(snapshot);
  });

  empruntsData.on('child_removed', function(snapshot) {
    delEmprunt(snapshot);
  });


  /** 
   * Supprime un message dans la base de données
   */
  $scope.historateEmprunt = function(emprunt) {

    var postData = emprunt.value;

    // Get a key for a new Post.
    var newPostKey = database.ref().child('historique').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/historique/' + newPostKey] = postData;

    var pushResult = database.ref().update(updates);

    database.ref('/enCours/'+emprunt.key).remove();
  };







  //
  // UE
  // 

  // réucpération 
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


  /** 
   * Met à jour les infos d'un membre de l'UE
   */
  $scope.majMembre = function(membre, nom, prenom, bucque, description) {

    if (membre==undefined || nom==undefined || prenom==undefined || bucque==undefined || description==undefined
        || membre=="" || nom=="" || prenom=="" || bucque=="" || description=="") {
      try {
        var snackbarContainer = document.querySelector('#demo-snackbar-example');
        var data = {
          message: 'Tout les champs doivent être remplis',
          timeout: 2000,
          actionText: "Ok ta macar's"
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      } catch (e) {
        console.log("le navigateur fait de la merde");
      }

    } else {

      var postData = membre.value;
      postData.nom = nom;
      postData.prenom = prenom;
      postData.bucque = bucque;
      postData.description = description;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/membres-ue/' + membre.key] = postData;

      var pushResult = database.ref().update(updates);

      try {
        var snackbarContainer = document.querySelector('#demo-snackbar-example');
        var data = {
          message: "Bool's modifié",
          timeout: 2000,
          actionText: "Ok ta macar's"
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      } catch (e) {
        console.log("le navigateur fait de la merde");
      }

      $scope.bucque = "";
      $scope.nom = "";
      $scope.prenom = "";
      $scope.description = "";
      $scope.bucque = "";

    }
  };







  //
  // MESSAGES PG POUR L'UE
  //

  // réucpération messages
  $scope.messages = [];
  var messagesData = database.ref('messages');

  //var isFirstCall = true;
  $scope.isLoaded = false;


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


  /** 
   * Supprime un message dans la base de données
   */
  $scope.deleteMessage = function(message) {
    database.ref('/messages/'+message.key).remove();
  };



    //$scope.data = item1;
}]);

