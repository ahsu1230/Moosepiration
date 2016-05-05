'use strict';
var app = angular.module('myApp', [
	'ngRoute'
]);

/**
 * Configure routes
 */
app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when("/", {
        templateUrl: "templates/loaders.html",
        controller: "LoadersCtrl"
    }).when("/loaders", {
        templateUrl: "templates/loaders.html",
        controller: "LoadersCtrl"
    }).when("/menus", {
        templateUrl: "templates/menus.html",
        controller: "MenusCtrl"
    }).when("/ftue", {
        templateUrl: "templates/ftue.html",
        controller: "FtueCtrl"
    }).when("/accordions", {
        templateUrl: "templates/accordions.html",
        controller: "AccordionsCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
