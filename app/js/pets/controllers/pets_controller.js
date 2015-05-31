'use strict';

module.exports = function(app) {
  app.controller('petsCtrl', ['$scope', '$http', function($scope, $http) {
    //hold errors
    $scope.errors = [];
    $scope.pets = [];

    $scope.getAll = function() {
      $http.get('/api/pets')
        .success(function(data) {
          /*you assign a key of pets to the array of objects you're 
          receiving back from the GET request(data)*/
          $scope.pets = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error retrieving pets'});
        });
    };

    $scope.createNewPet = function() {

      $http.post('/api/pets', $scope.newPet)
        .success(function(data) {
          $scope.pets.push(data);
          //clear out the newPet after it is pushed
          $scope.newPet = null;
        })
        .error(function(data) {
          console.log(data);
          $scope.data.push({msg: 'could not create new note'});
        });
    };

    $scope.removePet = function(pet) {
      /*You are removing the pet element you
      are selecting to delete (splice) and 
      locating the index of that element
      in your array of objects (indexOf)*/
      $scope.pets.splice($scope.pets.indexOf(pet), 1);
      //this deletes the object from the DB
      $http.delete('/api/pets/' + pet._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not remove pet: ' + pet});
        });
    };

    $scope.savePet = function(pet) {
      //reset editing status
      pet.editing = false;
      
      $http.put('/api/pets/' + pet._id, pet)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not save changes'});
        });
    };

    $scope.editPet = function(pet) {
      pet.editing = true;
      
      //save a copy of original object
      $scope.tempPet = angular.copy(pet);
    };

    $scope.cancelEditing = function(pet) {
      pet.editing = false;
      
      if (pet != $scope.tempPet) {
        if (pet.name !== $scope.tempPet.name) {
          pet.name = $scope.tempPet.name;
        }
        if (pet.owner !== $scope.tempPet.owner) {
          pet.owner = $scope.tempPet.owner;
        }
        if (pet.weight !== $scope.tempPet.weight) {
          pet.weight = $scope.tempPet.weight;
        }
        if (pet.type !== $scope.tempPet.type) {
          pet.type = $scope.tempPet.type;
        }
      }

      //set object to null for next edit
      $scope.tempPet = null;
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
