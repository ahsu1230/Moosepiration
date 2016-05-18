app.directive("ahsuFtueOutline1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/FTUE/outline1.html',
    scope: {
      highlights: '='
    },
    link: function(scope, elem, attrs) {
        scope.highlightIndex = 0;
        var hasVScroll = window.innerHeight < document.body.offsetHeight;
        var scrollWidth = 0;
        if (hasVScroll) {
          scrollWidth = 15;
        }

        function extractHighlightProperties(highlight) {
          highlight.object = $(highlight.identifier);
          highlight.top = highlight.object.offset().top;
          highlight.left = highlight.object.offset().left;
          highlight.height = highlight.object.innerHeight();
          highlight.width = highlight.object.innerWidth();
        }

        function renderHighlight() {
          var highlight = scope.highlights[scope.highlightIndex];
          extractHighlightProperties(highlight);
          var paddingH = highlight.paddingH;
          var paddingV = highlight.paddingV;

          var topY = highlight.top - paddingV;
          var bottomY = highlight.top + highlight.height + paddingV;
          var leftX = highlight.left - paddingH;
          var rightX = highlight.left + highlight.width + paddingH;
          var borderThickness = 4;
          var totalHighlightWidth = highlight.width + paddingH * 2 + borderThickness;
          var totalHighlightHeight = highlight.height + paddingV * 2 + borderThickness;
          var timing = 500;

          var topLeftDownOverlay = $(elem.find('.ahsu-rectangular-overlay.top-left-down'));
          var bottomRightUpOverlay = $(elem.find('.ahsu-rectangular-overlay.bottom-right-up'));
          var bottomLeftRightOverlay = $(elem.find('.ahsu-rectangular-overlay.bottom-left-right'));
          var topRightLeftOverlay = $(elem.find('.ahsu-rectangular-overlay.top-right-left'));

          topLeftDownOverlay.animate({
            width: leftX + 'px',
            height: bottomY + 'px',
            opacity: 1.0
          }, timing);
          topLeftDownOverlay.find('.ahsu-highlighter').height(totalHighlightHeight);

          bottomLeftRightOverlay.animate({
            width: rightX + 'px',
            height: window.innerHeight - bottomY + 'px',
            opacity: 1.0
          }, timing);
          bottomLeftRightOverlay.find('.ahsu-highlighter').width(totalHighlightWidth);

          bottomRightUpOverlay.animate({
            width: window.innerWidth - rightX - scrollWidth + 'px',
            height: window.innerHeight - topY + 'px',
            opacity: 1.0
          }, timing);
          bottomRightUpOverlay.find('.ahsu-highlighter').height(totalHighlightHeight);

          topRightLeftOverlay.animate({
            width: window.innerWidth - leftX - scrollWidth + 'px',
            height: topY + 'px',
            opacity: 1.0
          }, timing);
          topRightLeftOverlay.find('.ahsu-highlighter').width(totalHighlightWidth);

          if (scope.highlightIndex == 0) {
            setTimeout(function() {
              $('.ahsu-highlighter').addClass('ahsu-highlight');
              $('.ahsu-ftue-description').addClass('ahsu-show');
            }, timing + 500);
          } else {
            setTimeout(function() {
              $('.ahsu-highlighter').addClass('ahsu-highlight');
              $('.ahsu-ftue-description').addClass('ahsu-show');
            }, timing );
          }
        }

        function nextHighlight() {
          $('.ahsu-highlighter').removeClass('ahsu-highlight');
          $('.ahsu-ftue-description').removeClass('ahsu-show');
          scope.highlightIndex++;
          scope.$apply();
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
          scope.highlightIndex = 0;
          scrollToHighlight();
          renderHighlight();
          $(document).keyup(onKeyPressHighlightsStarted);
        }

        function scrollToHighlight() {
          var highlight = scope.highlights[scope.highlightIndex];
          var scrollX = highlight.left - (highlight.width / 2);
          var scrollY = highlight.top - (highlight.height / 2);
          window.scrollTo(scrollX, scrollY);
        }

        function exitHighlights() {
          var overlays = [
            $(elem.find('.ahsu-rectangular-overlay.top-left-down')),
            $(elem.find('.ahsu-rectangular-overlay.bottom-right-up')),
            $(elem.find('.ahsu-rectangular-overlay.bottom-left-right')),
            $(elem.find('.ahsu-rectangular-overlay.top-right-left'))
          ];
          for (var i = 0; i < overlays.length; i++) {
            overlays[i].css({
              'width' : '0px',
              'height' : '0px',
              'opacity' : '0.0'
            });
            overlays[i].find('.ahsu-highlighter').removeClass('ahsu-highlight');
          }

          $('.ahsu-ftue-description').removeClass('ahsu-show');

          // remove key listeners
          $(document).unbind('keyup', onKeyPressHighlightsStarted);
        }

        scope.highlightIndex = 0;
        startHighlights();
    }
  };
});
