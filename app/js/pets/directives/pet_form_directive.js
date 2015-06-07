'use strict';

module.exports = function(app) {
	app.directive('petFormDirective', function() {
		return {
			restrict: 'AC',
			//replaces an element with what you are inserting
			//in this example, we are replacing a div with our new_pet_form.html template
			replace: true,
			templateUrl: '/templates/directives/pet_form.html',
			scope: {
				//passing this in the scope of the HTML
				save: '&',
				buttonText: '=',
				pet: '='
			},
			transclude: true
		};
	});

	app.directive('petEditFormDirective', function() {
		return {
			restrict: 'AC',
			replace: true,
			templateUrl: '/templates/directives/pet_edit_form.html',
			scope: {
				save: '&',
				buttonText: '=',
				pet: '='
			},
			transclude: true
		};
	});
};
