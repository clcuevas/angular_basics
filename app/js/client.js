'use strict';

require('angular/angular.js');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var petsApp = angular.module('petsApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('./services/copy.js')(petsApp);
require('./services/rest_resource.js')(petsApp);
require('./auth/services/auth.js')(petsApp);

//controllers
require('./pets/controllers/pets_controller.js')(petsApp);
require('./auth/controllers/auth_controller.js')(petsApp);

//directives
require('./directives/simple_directive.js')(petsApp);
require('./pets/directives/pet_form_directive.js')(petsApp);

petsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/pets', {
			templateUrl: 'templates/views/pets_view.html',
			controller: 'petsCtrl'
		})
		.when('/signin', {
			templateUrl: 'templates/views/sign_in.html',
			controller: 'authController'
		})
		.when('/', {
			redirectTo: '/pets'
		});
}]);
