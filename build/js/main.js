'use strict';
var app = angular.module('myApp', [
	'ngRoute'
]);

/**
 * Configure routes
 */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when("/", {
        templateUrl: "templates/Loaders/loaders.html",
        controller: "LoadersCtrl"
    }).when("/loaders", {
        templateUrl: "templates/Loaders/loaders.html",
        controller: "LoadersCtrl"
    }).when("/menus", {
        templateUrl: "templates/Menus/menus.html",
        controller: "MenusCtrl"
    }).when("/ftue", {
        templateUrl: "templates/Ftue/ftue.html",
        controller: "FtueCtrl"
    }).when("/accordions", {
        templateUrl: "templates/Accordions/accordions.html",
        controller: "AccordionsCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

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