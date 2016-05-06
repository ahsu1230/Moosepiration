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
