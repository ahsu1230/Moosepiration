'use strict';
var app = angular.module('myApp');
app.controller("AccordionsCtrl", ['$scope', function ($scope) {
	$scope.query = '';

	$scope.search = function(item) {
		if (!$scope.query 
				|| (item.title.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) 
				|| (item.content.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'rotating_arrow1',
			title: 'Rotating Arrow 1',
			content: 'When clicking on the arrow, it rotates as the content is displayed. When selecting it again, it returns back to the normal direction.'
		},
		{
			id: 'plus_button1',
			title: 'Plus Button 1',
			content: 'When clicking on the plus sign, content is displayed. The plus sign shrinks to show it has been pressed, then returns to normal when pressed again.'
		},
		{
			id: 'plus_minus1',
			title: 'Plus to Minus 1',
			content: 'The Plus sign button alternates to a Minus sign button when clicked on. Plus means content can be shown, Minus means content can be retracted.	'
		}
	];
}]);