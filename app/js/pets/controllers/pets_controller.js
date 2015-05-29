'use strict';

module.exports = function(app) {
  app.controller('petsCtrl', ['$scope', '$http', function($scope, $http) {
    //hold errors
    $scope.errors = [];
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
    //$scope.getAll();

    $scope.createNewPet = function() {
      alert('clicked');
    };
  }]);
};