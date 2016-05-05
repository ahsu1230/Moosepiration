'use strict';
var app = angular.module('myApp');
app.controller("LoadersCtrl", ['$scope', function ($scope) {
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
			id: 'progress_bar1',
			title: 'Progress Bar 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "A loading bar with a green progress filler. A checkmark appears when the loading is done. Great for general usage!",
		},
		{
			id: 'progress_bar2',
			title: 'Progress Bar 2',
			imageSrc: 'icons/spinner-orange.png',
			description: "A loading bar with a green progress filler. The bar highlights when the loading is done. Great for general usage!",
		},
		{
			id: 'circle_filler',
			title: 'Circle Filler',
			imageSrc: 'icons/spinner-orange.png',
			description: "Circle Filler.",
		},
		{
			id: 'single_pulser1',
			title: 'Single Pulser 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'line_pulser1',
			title: 'Line Pulser 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'step_list1',
			title: 'List of Steps 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'profile_progress1',
			title: 'Profile Progress1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
	];
}]);