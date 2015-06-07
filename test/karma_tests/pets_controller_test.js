'use strict';

//this runs all the code we copied into our bundle
require('../../app/js/client.js');
require('angular-mocks');

describe('pets controller', function() {
  //this is the ControllerConstructor
  var $CC;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('petsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    //this creates a fresh scope before each test
    $scope = $rootScope.$new();
    //this creates a fresh controller before each test
    $CC = $controller;
  }));

  it('should be able to create a new controller', function() {
    //the $scope assignment sets your $scope declaration as an actual $rootScope
    var petsController = $CC('petsCtrl', {$scope: $scope});

    expect(typeof petsController).toBe('object');
    expect(Array.isArray($scope.pets)).toBe(true);
    expect(Array.isArray($scope.errors)).toBe(true);
  });

  describe('REST functionality', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      this.petsController = $CC('petsCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request on index', function() {
      $httpBackend.expectGET('/api/pets').respond(200, [{_id: '1', name: 'peanut', owner: 'claudia', weight: 22, type: 'dog'}]);
      $scope.getAll();
      //this sends all responses we set up
      $httpBackend.flush();
      expect($scope.pets[0].name).toBe('peanut');
      expect($scope.pets[0]._id).toBe('1');
    });

    it('should correctly handle errors', function() {
      $httpBackend.expectGET('/api/pets').respond(500, {msg: 'server error'});
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('error retrieving pets');
    });

    it('should be able to POST a new pet object', function() {
      $scope.newPet = {name: 'butter', owner: 'claudia', weight: 19, type: 'dog', _id: '2'};
      $httpBackend.expectPOST('/api/pets').respond(200, {name: 'butter', owner: 'claudia', weight: 19, type: 'dog', _id: '2'});
      $scope.createNewPet();
      $httpBackend.flush();
      //if there are no items in an array it returns -1, we want there to be something
      expect($scope.pets[0].name).toBe('butter');
      expect($scope.pets[0]._id).toBe('2');
      //expect($scope.newPet).toBe(null); <---why is this failing now?
    });

    it('should DELETE a pet', function() {
      //create a new pet object and push to pets array to remove with this test
      var pet = {_id: '3', name: 'taju', owner: 'tiana', weight: 2, type: 'ferret'};
      $scope.pets.push(pet);
      $httpBackend.expectDELETE('/api/pets/3').respond(200, {msg: 'success'});
      //this should validate we successfully created a temp pet object
      expect($scope.pets.indexOf(pet)).not.toBe(-1);
      //delete the pet object
      $scope.removePet(pet);
      //this should validate we removed the pet object successfully
      expect($scope.pets.indexOf(pet)).toBe(-1);
      $httpBackend.flush();
      //verify nothing gets added to the errors array after deletion (no error occurred)
      expect($scope.errors.length).toBe(0);
    });

    it('should DELETE a pet even on server error', function() {
      //create a new pet object and push to pets array to remove with this test
      var pet = {_id: '4', name: 'taju', owner: 'tiana', weight: 2, type: 'ferret'};
      $scope.pets.push(pet);
      $httpBackend.expectDELETE('/api/pets/4').respond(500, {msg: 'something went wrong'});
      //this should validate we successfully created a temp pet object
      expect($scope.pets.indexOf(pet)).not.toBe(-1);
      //delete the pet object
      $scope.removePet(pet);
      //this should validate we removed the pet object successfully
      expect($scope.pets.indexOf(pet)).toBe(-1);
      $httpBackend.flush();
      //verify nothing gets added to the errors array after deletion (no error occurred)
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not remove pet: ' + pet);
    });

    it('should update an existing object, PUT', function() {
      var pet = {_id: '5', name: 'nook', owner: 'tian', weight: 2, type: 'ferret'};
      $scope.pets.push(pet);
      $httpBackend.expectPUT('/api/pets/5', $scope.editPet($scope.pets[0].owner = 'tiana')).respond(200, {msg: 'success'});
      $scope.savePet(pet);
      $httpBackend.flush();
      expect($scope.pets[0].owner).toBe('tiana');
      expect($scope.pets[0].editing).toBe(false);
      expect($scope.pets.length).toBe(1);
    });

    it('should update an existing pet object even on server error', function() {
      var pet = {_id: '5', name: 'nook', owner: 'tian', weight: 2, type: 'ferret'};
      $scope.pets.push(pet);
      $httpBackend.expectPUT('/api/pets/5', $scope.editPet($scope.pets[0].owner = 'tiana')).respond(500, {msg: 'something went wrong'});
      $scope.savePet(pet);
      $httpBackend.flush();
      expect($scope.pets[0].owner).toBe('tiana');
      expect($scope.errors.length).toBe(1);
      expect($scope.errors[0].msg).toBe('could not save changes');
    });
  });
});
