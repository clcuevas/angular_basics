'use strict';

require('angular/angular.js');

var petsApp = angular.module('petsApp', []);

petsApp.controller('petsCtrl', ['$scope', function($scope) {
  $scope.greeting = 'hello world!';
  $scope.displayGreeting = function() {
    alert($scope.greeting);
  };
}]);

