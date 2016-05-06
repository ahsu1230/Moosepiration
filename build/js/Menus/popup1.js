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
