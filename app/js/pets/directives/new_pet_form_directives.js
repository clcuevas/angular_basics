'use strict';

module.exports = function(app) {
	app.directive('newPetFormDirective', function() {
		return {
			restrict: 'A',
			//replaces an element with what you are inserting
			//in this example, we are replacing a div with our new_pet_form.html template
			replace: true,
			templateUrl: '/templates/directives/new_pet_form.html'
		};
	});
};
