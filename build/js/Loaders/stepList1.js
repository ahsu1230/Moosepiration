app.directive("ahsuLoadingStepList1", function($timeout) {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/stepList1.html',
    link: function(scope, elem, attrs) {

      scope.stepCnt = 1;
      scope.steps = [
        {
          text: "Contacting our servers..."
        },
        {
          text: "Submitting your information..."
        },
        {
          text: "Retrieving your data..."
        },
        {
          text: "Moosing around..."
        },
        {
          text: "Finished!"
        }
      ];

    	function animate() {
        var allLists = $('.ahsu-list-wrapper li');
        var i = 0;
        var timing = 0;
        var timingInterval = 500;

        for (i = 0; i < allLists.length; i++) {
          var target = allLists.eq(i);
          setTimeout(highlight, timing, target);
          setTimeout(complete, timing + 500, target);
          if (i != allLists.length - 1) {
            setTimeout(stepUp, timing + 1000, target);
          }
          timing += 1000;
        }

        setTimeout(function() {
          $('.ahsu-list-wrapper').addClass('hide');
          $('.view-to-show').addClass('show');
        }, timing + timingInterval);
		  }

      function highlight(item) {
        item.addClass('ahsu-highlighted');
      }

      function complete(item) {
        item.addClass('ahsu-completed');
      }

      function stepUp(item) {
        item.addClass('ahsu-past');
        var target = $('.ahsu-list-wrapper ul');
        var listHeight = target.find('li').height();
        var top = target.position().top;
        target.animate({
          top: top - listHeight
        }, 300, 'swing');
        incrementStepCount();
      }

      function incrementStepCount() {
        scope.stepCnt++;
        scope.$apply();
      }

      function resetStepCount() {
        scope.stepCnt = 1;
        scope.$apply();
      }

  		function resetAnimation() {
        var wrapper = $('.ahsu-list-wrapper');
        var listWrapper = wrapper.find('ul');
        listWrapper.css('top', '10%');
        var allLists = listWrapper.find('li');
        var i = 0;
        for (i = 0; i < allLists.length; i++) {
          var target = allLists.eq(i);
          target.removeClass('ahsu-highlighted');
          target.removeClass('ahsu-completed');
          target.removeClass('ahsu-past');
        }

        wrapper.removeClass('hide');
        $('.view-to-show').removeClass('show');
        resetStepCount();
  		}

      $timeout(function() {
        animate();
        $('button.reset').click(function() {
          resetAnimation();
          animate();
        });
      });
      
    }
  };
});
