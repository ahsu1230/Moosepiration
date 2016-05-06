'use strict';
var app = angular.module('myApp');
app.controller("MenusCtrl", ['$scope', function ($scope) {
	$scope.query = '';

	$scope.extendDescription = function(event) {
		var target = $(event.currentTarget);
		if (target.hasClass('extend')) {
			target.removeClass('extend');
		} else {
			target.addClass('extend');
		}
	};

	$scope.search = function(item) {
		if (!$scope.query 
				|| (item.title.toLowerCase().indexOf($scope.query) != -1) 
				|| (item.description.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'popup1',
			title: 'Popup1',
			description: "Some menu that fades in",
			type: 'button'
		},
		{
			id: 'banner1',
			title: 'Banner1',
			description: "Menu tabs that underline when hover over",
			type: 'banner'
		},
	];
}]);