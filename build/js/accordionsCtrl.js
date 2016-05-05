'use strict';
var app = angular.module('myApp');
app.controller("AccordionCtrl", ['$scope', function ($scope) {
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
	];
}]);