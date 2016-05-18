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

'use strict';
var app = angular.module('myApp');
app.controller("LoadersCtrl", ['$scope', function ($scope) {
	$scope.query = '';
	$scope.selectedAnimation = undefined;
	
	$scope.selectAnimation= function(anim) {
		$scope.selectedAnimation = anim;
		$('.modal-overlay').addClass('show');
	};
	
	$scope.closeModal = function() {
		$scope.selectedAnimation = undefined;
		$('.modal-overlay').removeClass('show');
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
				|| (item.title.toLowerCase().indexOf($scope.query) != -1) 
				|| (item.description.toLowerCase().indexOf($scope.query.toLowerCase()) != -1) ) {
	        return true;
	    }
	    return false;
	};

	$scope.animations = [
		{
			id: 'spinner1',
			title: 'Spinner1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Some orange clock spinner that sets back counter-clockwise and then accelerates clock-wise. Good for animations that load longer.",
		},
		{
			id: 'progress_bar1',
			title: 'Progress Bar 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "A loading bar with a green progress filler. A checkmark appears when the loading is done. Great for general usage!",
		},
		{
			id: 'progress_bar2',
			title: 'Progress Bar 2',
			imageSrc: 'icons/spinner-orange.png',
			description: "A loading bar with a green progress filler. The bar highlights when the loading is done. Great for general usage!",
		},
		{
			id: 'circle_filler',
			title: 'Circle Filler',
			imageSrc: 'icons/spinner-orange.png',
			description: "Circle Filler.",
		},
		{
			id: 'single_pulser1',
			title: 'Single Pulser 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'line_pulser1',
			title: 'Line Pulser 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'step_list1',
			title: 'List of Steps 1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
		{
			id: 'profile_progress1',
			title: 'Profile Progress1',
			imageSrc: 'icons/spinner-orange.png',
			description: "Loading indicator pulsing",
		},
	];
}]);
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

app.directive("ahsuLoadingProgressBar2", function() {
  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: 'templates/Loaders/progressBar2.html',
    link: function(scope, elem, attrs) {

      function animate() {
        var progress = $('.ahsu-progress-bar2 .ahsu-progress');
        var bar = $('.ahsu-progress-bar2 .ahsu-bar');
        progress.animate({width: '60%'}, 1100, 'swing', function() {
          progress.animate({width: '100%'}, 300, 'linear', function() {
            bar.addClass('ahsu-highlight');
            progress.addClass('ahsu-complete');
            setTimeout(function() {
              $('.view-to-show').addClass('show');
              $('.ahsu-progress-bar2').addClass('ahsu-hide');
            }, 700);
          });
        });
      }

      function resetAnimation() {
          $('.ahsu-progress-bar2 .ahsu-progress').css('width', '0%');
          $('.ahsu-progress-bar2 .ahsu-progress').removeClass('ahsu-complete');
          $('.ahsu-progress-bar2 .ahsu-bar').removeClass('ahsu-highlight');
          $('.view-to-show').removeClass('show');
          $('.ahsu-progress-bar2').removeClass('ahsu-hide');
      }

      animate();
      $('button.reset').click(function() {
        resetAnimation();
        animate();
      });
      
    }
  };
});

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

app.directive("ahsuLoadingSpinner1", function() {
  return {
  	restrict: 'AE', // only match attribute name ('ahsu-spinner1')
  	replace: 'true',
    templateUrl: 'templates/Loaders/spinner1.html',
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
