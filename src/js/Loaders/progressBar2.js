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
