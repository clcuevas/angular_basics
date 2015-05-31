'use strict';

require('angular/angular.js');

var petsApp = angular.module('petsApp', []);

require('./pets/controllers/pets_controller.js')(petsApp);
