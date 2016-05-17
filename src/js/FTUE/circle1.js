app.directive("ahsuFtueCircle1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/FTUE/circle1.html',
    scope: {
      highlights: '='
    },
    link: function(scope, elem, attrs) {
        scope.highlightIndex = 0;

        function renderHighlight() {
          var highlight = scope.highlights[scope.highlightIndex];
          var guide = $(elem.find('.ahsu-circle-outliner'));
          var pointer = guide.find('.ahsu-circle-pointer');
          debugger;
        }

        function nextHighlight() {
          scope.highlightIndex++;
          if (scope.highlightIndex < scope.highlights.length) {
            renderHighlight();
          } else {
            exitHighlights();
          }
        }

        function onKeyPressHighlightsStarted(e) {
          if (e.keyCode == 13) { // ENTER key
            nextHighlight();
          } else if (e.keyCode == 27) { // ESC key
            exitHighlights();
          }
        }

        function startHighlights() {
          renderHighlight();
        }

        function exitHighlights() {
          $('.ahsu-ftue-description').removeClass('ahsu-show');
        }

        startHighlights();
    }
  };
});
