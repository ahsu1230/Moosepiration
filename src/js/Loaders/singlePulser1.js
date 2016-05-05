app.directive("ahsuLoadingSinglePulser1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/singlePulser1.html',
    link: function(scope, elem, attrs) {

    	function animate() {
        setTimeout(function() {
          $('.ahsu-single-pulser1').addClass('hide');
          $('.view-to-show').addClass('show');
        }, 3000);
		  }

  		function resetAnimation() {
        $('.ahsu-single-pulser1').removeClass('hide');
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
