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

          var topLeftDownOverlay = $(elem.find('.ahsu-rectangular-overlay.top-left-down'));
          var bottomRightUpOverlay = $(elem.find('.ahsu-rectangular-overlay.bottom-right-up'));
          var bottomLeftRightOverlay = $(elem.find('.ahsu-rectangular-overlay.bottom-left-right'));
          var topRightLeftOverlay = $(elem.find('.ahsu-rectangular-overlay.top-right-left'));
          var paddingH = highlight.paddingH;
          var paddingV = highlight.paddingV;
          var borderThickness = 4;
          var timing = 500;

          var topY = highlight.top - paddingV;
          var bottomY = highlight.top + highlight.height + paddingV;
          var leftX = highlight.left - paddingH;
          var rightX = highlight.left + highlight.width + paddingH;
          var totalHighlightWidth = highlight.width + paddingH * 2 + borderThickness;
          var totalHighlightHeight = highlight.height + paddingV * 2 + borderThickness;

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
            width: window.innerWidth - rightX - 15 + 'px', // chrome scrollbar is 17px
            height: window.innerHeight - topY + 'px',
            opacity: 1.0
          }, timing);
          bottomRightUpOverlay.find('.ahsu-highlighter').height(totalHighlightHeight);

          topRightLeftOverlay.animate({
            width: window.innerWidth - leftX - 15 + 'px', // chrome scrollbar is 17px
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
            overlays[i].width = '0px';
            overlays[i].height = '0px';
            overlays[i].css({'opacity' : '0.0'});
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
