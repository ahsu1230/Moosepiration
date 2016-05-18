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
        var hasVScroll = window.innerHeight < document.body.offsetHeight;
        var scrollWidth = 0;
        if (hasVScroll) {
          scrollWidth = 15;
        }

        var maxDiameter = 360;

        function extractHighlightProperties(highlight) {
          highlight.object = $(highlight.identifier);

          var needsClipV = highlight.object.innerHeight() > maxDiameter;
          var needsClipH = highlight.object.innerWidth() > maxDiameter;

          highlight.height = Math.min(highlight.object.innerHeight(), maxDiameter);
          highlight.width = Math.min(highlight.object.innerWidth(), maxDiameter);
          highlight.top = needsClipV ? highlight.object.offset().top - (maxDiameter / 4) : highlight.object.offset().top;
          highlight.left = needsClipH ? highlight.object.offset().left - (maxDiameter / 4) : highlight.object.offset().left;
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

          var radiusPadding = 16;
          var centerY = topY + (bottomY - topY) / 2;
          var centerX = leftX + (rightX - leftX) / 2;
          var diameter = Math.max(highlight.width + 2 * paddingH, highlight.height + 2 * paddingV) + radiusPadding;
          diameter = diameter * 1.5;
          var radius = diameter / 2;

          topY = centerY - radius;
          bottomY = centerY + radius;
          leftX = centerX - radius;
          rightX = centerX + radius;

          var timing = 500;

          $(elem.find('.ahsu-rectangular-overlay.top-down')).animate({
            top: '0px',
            height: topY + 'px'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.bottom-up')).animate({
            bottom: '0px',
            height: window.innerHeight - bottomY + 'px'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.right-to-left')).animate({
            top: topY + 'px',
            right: '0px',
            width: window.innerWidth - rightX + 'px',
            height: diameter + 'px'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.left-to-right')).animate({
            top: topY + 'px',
            left: '0px',
            width: leftX + 'px',
            height: diameter + 'px'
          }, timing);

          
          var guide = $(elem.find('.ahsu-circle-outliner'));
          guide.animate({
            top: topY,
            left: leftX,
            width: diameter,
            height: diameter
          }, timing);
          guide.addClass('ahsu-show');

          if (scope.highlightIndex == 0) {
            setTimeout(function() {
              $('.ahsu-ftue-description').addClass('ahsu-show');
            }, timing + 500);
          } else {
            setTimeout(function() {
              $('.ahsu-ftue-description').addClass('ahsu-show');
            }, timing );
          }
        }

        function nextHighlight() {
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
          var timing = 500;

          $(elem.find('.ahsu-rectangular-overlay.top-down')).animate({
            top: '-50%',
            height: '0px'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.bottom-up')).animate({
            bottom: '-50%',
            height: '0px'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.right-to-left')).animate({
            right: '-50%',
            width: '0px',
            height: '100%'
          }, timing);

          $(elem.find('.ahsu-rectangular-overlay.left-to-right')).animate({
            left: '-50%',
            width: '0px',
            height: '100%'
          }, timing);

          $(elem.find('.ahsu-circle-outliner')).animate({
            'width': '200%', 
            'height': '200%', 
            'top': '-50%', 
            'left' : '-50%'
          }, timing);
          $(elem.find('.ahsu-circle-outliner')).removeClass('ahsu-show');
          $('.ahsu-ftue-description').removeClass('ahsu-show');

          // remove key listeners
          $(document).unbind('keyup', onKeyPressHighlightsStarted);
        }

        startHighlights();
    }
  };
});
