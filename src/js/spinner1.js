app.directive("ahsuLoadingSpinner1", function() {
  return {
  	restrict: 'AE', // only match attribute name ('ahsu-spinner1')
  	replace: 'true',
    templateUrl: 'templates/spinner1.html',
    link: function(scope, elem, attrs) {

    	function animate() {
			var target = $('.ahsu-spinner1-wrapper img');
			target.addClass('spin-back');
			setTimeout(function() {
				target.addClass('spin-forward-fast');
				setTimeout(function() {
					$('.ahsu-loading-spinner1-wrapper').addClass('disappear');
					$('.view-to-show').addClass('show');
				}, 800);
			}, 1100);
		}

		function resetAnimation() {
			var target = $('.ahsu-spinner1-wrapper img');
			target.removeClass('spin-back');
			target.removeClass('spin-forward-fast');
			$('.ahsu-loading-spinner1-wrapper').removeClass('disappear');
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
