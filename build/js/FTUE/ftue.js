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

'use strict';
var app = angular.module('myApp');
app.controller("FtueCtrl", ['$scope', function ($scope) {
	$scope.query = '';
	$scope.selectedAnimation = undefined;
	
	$scope.selectAnimation= function(anim) {
		$scope.selectedAnimation = anim;
	};

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
				|| (item.title.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) 
				|| (item.description.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'outline1',
			title: 'Outline Highlighter',
			description: 'This FTUE uses colored borders to highlight things.'
		},
		{
			id: 'circle1',
			title: 'Circle Pointer',
			description: 'This FTUE uses circular pointers to guide users and visuals.'
		}
	];

	function createHighlightInfo(identifier, description, paddingH, paddingV) {
		return {
			identifier: identifier,
			description: description,
			paddingH: paddingH,
			paddingV: paddingV
		};
	}

	$scope.highlights = [
		createHighlightInfo(".header-logo-wrapper a:contains('Moosepiration')", 'Main header link to go to home page. Press Enter to continue.', 8, 8),
		createHighlightInfo(".header-logo-wrapper .main-menu-wrapper", 'Main Menu to get around the site. Press Enter to continue.', 20, 4),
		createHighlightInfo(".search-bar-wrapper input", 'Use this Search bar to look for stuff. Press Enter to continue.', 16, 16)
	];
}]);
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
