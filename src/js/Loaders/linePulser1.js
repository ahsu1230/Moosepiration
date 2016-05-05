app.directive("ahsuLoadingLinePulser1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/linePulser1.html',
    link: function(scope, elem, attrs) {

    	function animate() {
        setTimeout(function() {
          $('.ahsu-line-pulser1').addClass('hide');
          $('.view-to-show').addClass('show');
        }, 3600);
		  }

  		function resetAnimation() {
        $('.ahsu-line-pulser1').removeClass('hide');
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
