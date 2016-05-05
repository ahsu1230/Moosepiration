app.directive("ahsuLoadingProfileProgress1", function() {
  return {
  	restrict: 'AE',
  	replace: 'true',
    templateUrl: 'templates/Loaders/profileProgress1.html',
    link: function(scope, elem, attrs) {

    	function animate() {
          var wrapper = $('.ahsu-profile-progress');
          var rightHider = wrapper.find('.ahsu-hider.right');
          var bottomLeftHider = wrapper.find('.ahsu-hider.bottom-left');
          var upperLeftHider = wrapper.find('.ahsu-hider.top-left');
          var profilePic = wrapper.find('img');

          rightHider.animate({top: '100%'}, 1000, 'linear', function() {
            rightHider.hide();
            bottomLeftHider.animate({left: '-50%'}, 1200, 'linear', function() {
              bottomLeftHider.hide();
              upperLeftHider.animate({top: '-100%'}, 300, 'swing', function() {
                profilePic.addClass('full');
                upperLeftHider.hide();
                wrapper.addClass('ahsu-done');
                setTimeout(function() {
                  $('.ahsu-profile-wrapper').addClass('ahsu-move');  
                  $('.view-to-show').addClass('show');
                }, 300);
              });
            });
          });
		  }

  		function resetAnimation() {
        var wrapper = $('.ahsu-profile-progress');
        var rightHider = wrapper.find('.ahsu-hider.right');
        var bottomLeftHider = wrapper.find('.ahsu-hider.bottom-left');
        var upperLeftHider = wrapper.find('.ahsu-hider.top-left');
        var profilePic = wrapper.find('img');

        rightHider.find('.ahsu-hider.right').css('top', '0%');
        bottomLeftHider.find('.ahsu-hider.bottom-left').css('left', '0%');
        upperLeftHider.find('.ahsu-hider.upper-left').css('top', '0%');
        rightHider.show();
        bottomLeftHider.show();
        upperLeftHider.show();
        profilePic.removeClass('full');
        wrapper.removeClass('ahsu-done');
        $('.ahsu-profile-wrapper').removeClass('ahsu-move');  
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
