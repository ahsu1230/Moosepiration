app.directive("ahsuLoadingCircleFiller", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/circleFiller.html',
    link: function(scope, elem, attrs) {

    	function animate() {
    		var fillBlocker = $('.ahsu-circle-filler .ahsu-fill-blocker');

        fillBlocker.animate({
          top: '-15%'
        }, 600, function() {
          fillBlocker.animate({
            top: '-60%'
          }, 900, function() {
            fillBlocker.animate({
              top: '-100%'
            }, 200, function() {
              setTimeout(function() {
                $('.ahsu-circle-filler').addClass('hide');
                $('.view-to-show').addClass('show');
              }, 300);
            });
          });
        });
		  }

  		function resetAnimation() {
          var fillBlocker = $('.ahsu-circle-filler .ahsu-fill-blocker');
          fillBlocker.css('top', '0px');
          $('.ahsu-circle-filler').removeClass('hide');
          $('.view-to-show').removeClass('show');
  		}

  		animate();
  		$('button.reset').click(function() {
  			resetAnimation();
  			animate();
  		});
      
    }
  };
});
