(function() {
  var isParallaxDevice;
  isParallaxDevice = window.requestAnimationFrame && Modernizr.csstransforms3d && !Modernizr.touch;
  if (!isParallaxDevice) {
    return;
  }
  return $(function() {
    var $window, rafScroll;
    rafScroll = (function() {
      var animationFrameRequested, callbacks;
      animationFrameRequested = false;
      callbacks = $.Callbacks();
      $(window).scroll(function() {
        if (animationFrameRequested) {
          return;
        }
        animationFrameRequested = true;
        return window.requestAnimationFrame(function() {
          animationFrameRequested = false;
          return callbacks.fire();
        });
      });
      return {
        on: callbacks.add,
        off: callbacks.remove
      };
    })();
    $window = $(window);
    return $('[data-project-detail-parallax]').each(function(index, el) {
      var $el, $img, bottom, delta, init, lastChangeNotDone, parallax;
      bottom = 0;
      delta = 0;
      lastChangeNotDone = false;
      init = function() {
        var canvasHeight, imageHeight;
        canvasHeight = $el.height();
        imageHeight = $img.height();
        bottom = $el.offset().top + canvasHeight;
        return delta = imageHeight - canvasHeight;
      };
      parallax = function() {
        var offset, scrollTop;
        scrollTop = $window.scrollTop();
        if (bottom === 0 || scrollTop > bottom) {
          return;
        }
        offset = delta / bottom * scrollTop;
        return $img.css({
          transform: 'translate3d(0, ' + -offset + 'px ,0)'
        });
      };
      $el = $(el);
      $img = $el.find('[data-project-detail-parallax-image]');
      init();
      $window.resize(init);
      rafScroll.on(parallax);
      return window.requestAnimationFrame(parallax);
    });
  });
})();
