app.directive("ahsuAccordionPlusButton1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Accordions/plusButton1.html',
    scope: {
      title: '=?',
      content: '=?'
    },
    link: function(scope, elem, attrs) {
        scope.title = scope.title ? scope.title : 'Some title';
        scope.content = scope.content? scope.content : 'Some content';

        scope.toggleAccordion = function($event) {
          var target = $($event.currentTarget);
          var content = target.siblings();
          var className = 'ahsu-extend';
          if (target.hasClass(className)) {
            target.removeClass(className);
            content.removeClass('ahsu-show');
          } else {
            target.addClass(className);
            content.addClass('ahsu-show');
          }
        }
    }
  };
});
