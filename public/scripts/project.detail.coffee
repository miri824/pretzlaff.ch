do ->
    isParallaxDevice = window.requestAnimationFrame &&
        Modernizr.csstransforms3d &&
        !Modernizr.touch

    return if !(isParallaxDevice)

    $ ->
        rafScroll = (->
            animationFrameRequested = false
            callbacks = $.Callbacks()

            $(window).scroll ->
                return if animationFrameRequested
                animationFrameRequested = true

                window.requestAnimationFrame ->
                    animationFrameRequested = false
                    callbacks.fire()

            on: callbacks.add
            off: callbacks.remove
        )();

        $window = $(window);

        $('[data-project-detail-parallax]').each (index, el) ->

            bottom = 0;
            delta = 0;
            lastChangeNotDone = false;

            init = ->
                canvasHeight = $el.height()
                imageHeight = $img.height()
                bottom = $el.offset().top + canvasHeight
                delta = imageHeight - canvasHeight

            parallax = ->
                scrollTop = $window.scrollTop()

                return if bottom is 0 or scrollTop > bottom

                offset = delta / bottom * scrollTop

                $img.css({
                    transform: 'translate3d(0, ' + -offset + 'px ,0)'
                });


            $el = $(el)
            $img = $el.find('[data-project-detail-parallax-image]')

            init()
            # TODO debounce the init function
            $window.resize(init)

            rafScroll.on(parallax)
            window.requestAnimationFrame(parallax)
