'use strict';
var app = angular.module('myApp');
app.controller("HeaderCtrl", ['$scope', function ($scope) {
	$scope.links = [
		{
			title: 'Loaders',
			href: '/#/loaders'
		},
		{
			title: 'Menus',
			href: '/#/menus'
		},
		{
			title: 'Accordions',
			href: '/#/accordions'
		},
		{
			title: 'Ftue',
			href: '/#/ftue'
		},
	];
}]);