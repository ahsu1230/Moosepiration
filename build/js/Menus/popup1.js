app.directive("ahsuMenuPopup1", function($timeout) {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Menus/popup1.html',
    link: function(scope, elem, attrs) {
      scope.imgSrc = '../../icons/menu.png';
      
      scope.onShowMenu = function() {
        var button = angular.element('.ahsu-menu-popup1-wrapper button');
        var target = angular.element('.ahsu-menu-popup1-wrapper ul');
        if (target.hasClass('ahsu-show')) {
          button.removeClass('ahsu-active');
          target.removeClass('ahsu-show');
        } else {
          button.addClass('ahsu-active');
          target.addClass('ahsu-show');
        }
      };

      scope.items = [
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
    }
  };
});
