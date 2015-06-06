'use strict';

module.exports = function(app) {
	//naming directives is pretty important!
	//the name will be translated as data-simple-directive in HTML
	app.directive('simpleDirective', function() {
		//this will return the metadata of our directive
		return {
			//this determines what we can load in the DOM
			//AC stands for attributes and class
			restrict: 'AC',
			template: '<h2>{{someVal}}</h2><input type="text" data-ng-model="someVal">',
			//this scopes your directive to where you place it in HTML
			scope: {}
		};
	});
};
