app.directive("ahsuGoogleLoader", function() {
  return {
  	restrict: 'AE', // only match attribute name ('google-loader')
  	replace: 'true',
    templateUrl: 'templates/google-loader.html',
    link: function(scope, elem, attrs) {

    function animate() {

		}

		function resetAnimation() {
      
		}

		animate();
		$('button.reset').click(function() {
			resetAnimation();
			animate();
		});
    }
  };
});
