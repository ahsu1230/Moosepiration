'use strict';
var app = angular.module('myApp');
app.controller("FtueCtrl", ['$scope', function ($scope) {
	$scope.query = '';
	$scope.selectedAnimation = undefined;
	
	$scope.selectAnimation= function(anim) {
		$scope.selectedAnimation = anim;
	};

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
				|| (item.title.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) 
				|| (item.description.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'outline1',
			title: 'Outline Highlighter',
			description: 'This FTUE uses colored borders to highlight things.'
		},
		{
			id: 'circle1',
			title: 'Circle Pointer',
			description: 'This FTUE uses circular pointers to guide users and visuals.'
		}
	];

	function createHighlightInfo(identifier, description, paddingH, paddingV) {
		return {
			identifier: identifier,
			description: description,
			paddingH: paddingH,
			paddingV: paddingV
		};
	}

	$scope.highlights = [
		createHighlightInfo(".header-logo-wrapper a:contains('Moosepiration')", 'Main header link to go to home page. Press Enter to continue.', 8, 8),
		createHighlightInfo(".header-logo-wrapper .main-menu-wrapper", 'Main Menu to get around the site. Press Enter to continue.', 20, 4),
		createHighlightInfo(".search-bar-wrapper input", 'Use this Search bar to look for stuff. Press Enter to continue.', 16, 16)
	];
}]);