app.directive("ahsuMenuBanner1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Menus/banner1.html',
    scope: {
      items: '=?'
    },
    link: function(scope, elem, attrs) {

      var exampleItems = [
        {
          title: 'Link1',
          href: '#'
        },
        {
          title: 'Link2',
          href: '#'
        },
        {
          title: 'Link3',
          href: '#'
        },
        {
          title: 'Link4',
          href: '#'
        }
      ];

      scope.items = scope.items ? scope.items : exampleItems;
    }
  };
});

app.directive("ahsuMenuBanner2", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Menus/banner2.html',
    scope: {
      items: '=?'
    },
    link: function(scope, elem, attrs) {

      var exampleItems = [
        {
          title: 'Link1',
          href: '#'
        },
        {
          title: 'Link2',
          href: '#'
        },
        {
          title: 'Link3',
          href: '#'
        },
        {
          title: 'Link4',
          href: '#'
        }
      ];

      scope.items = scope.items ? scope.items : exampleItems;
    }
  };
});

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
			description: "Menu tabs that underlines when hovering over",
			type: 'banner'
		},
		{
			id: 'banner2',
			title: 'Banner2',
			description: "Menu tabs with moving underline when hovering over",
			type: 'banner'
		},
	];
}]);
app.directive("ahsuMenuPopup1", function($timeout) {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Menus/popup1.html',
    scope: {
      items: '=?'
    },
    link: function(scope, elem, attrs) {
      scope.imgSrc = '../../icons/menu.png';
      
      scope.onShowMenu = function($event) {
        var button = $($event.currentTarget);
        var list = button.siblings();
        if (list.hasClass('ahsu-show')) {
          button.removeClass('ahsu-active');
          list.removeClass('ahsu-show');
        } else {
          button.addClass('ahsu-active');
          list.addClass('ahsu-show');
        }
      };

      scope.onLinkClick = function($event) {
        var list = $($event.currentTarget.parentElement);
        var button = list.siblings();
        list.removeClass('ahsu-show');
        button.removeClass('ahsu-active');
      };

      var exampleItems = [
        {
          title: 'Link1',
          href: '#'
        },
        {
          title: 'Link2',
          href: '#'
        },
        {
          title: 'Link3',
          href: '#'
        },
        {
          title: 'Link4',
          href: '#'
        },
      ];

      scope.items = scope.items ? scope.items : exampleItems;
    }
  };
});
