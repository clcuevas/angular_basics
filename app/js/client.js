'use strict';

require('angular/angular.js');

var petsApp = angular.module('petsApp', []);

//services
require('./services/copy.js')(petsApp);
require('./services/rest_resource.js')(petsApp);

//controllers
require('./pets/controllers/pets_controller.js')(petsApp);

//directives
