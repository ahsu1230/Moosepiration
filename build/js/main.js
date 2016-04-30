'use strict';
var app = angular.module('myApp', []);

app.controller("MainCtrl", ['$scope', function ($scope) {
	$scope.query = '';
	$scope.selectedAnimation = undefined;
	
	$scope.selectAnimation= function(anim) {
		$scope.selectedAnimation = anim;
		$('.modal-overlay').addClass('show');
	};
	
	$scope.closeModal = function() {
		$scope.selectedAnimation = undefined;
		$('.modal-overlay').removeClass('show');
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
				|| (item.title.toLowerCase().indexOf($scope.query) != -1) 
				|| (item.description.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'spinner1',
			title: 'Spinner1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Some orange clock spinner that sets back counter-clockwise and then accelerates clock-wise. Good for animations that load longer.",
		},
		{
			id: 'google',
			title: 'Google Loader',
			imageSrc: 'icons/spinner-orange.png',
			description: "The same loader as Google. Use for any Google-related loading.",
		},
		{
			id: 'apple',
			title: 'Apple Loader',
			imageSrc: 'icons/spinner-orange.png',
			description: "The same loader as the Apple Macbook. Use for any Apple-related loading.",
		},
	];
}]);
