app.directive("ahsuLoadingProgressBar1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/progressBar1.html',
    link: function(scope, elem, attrs) {

    	function animate() {
    		var progress = $('.ahsu-progress-bar1 .ahsu-progress');
    		var checkmark = $('.ahsu-progress-bar1 img');
    		progress.animate({width: '60%'}, 1100, 'swing', function() {
    			progress.animate({width: '100%'}, 300, 'linear', function() {
    				checkmark.addClass('show');
            setTimeout(function() {
              $('.view-to-show').addClass('show');
              $('.ahsu-progress-bar1').addClass('hide');
            }, 500);
    			});
    		});
		  }

  		function resetAnimation() {
      		$('.ahsu-progress-bar1 .ahsu-progress').css('width', '0%');
      		$('.ahsu-progress-bar1 img').removeClass('show');
          $('.view-to-show').removeClass('show');
          $('.ahsu-progress-bar1').removeClass('hide');
  		}

  		animate();
  		$('button.reset').click(function() {
  			resetAnimation();
  			animate();
  		});
      
    }
  };
});
