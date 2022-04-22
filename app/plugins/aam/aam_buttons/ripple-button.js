$.fn.rippleButton = function(params={}){
    let defaults = {
        duration : 600,
        dark     : false,
        hover    : true,
        click    : true
    };
    params = Object.assign(defaults, params);
    switch (params.duration) {
        case "slow":
            params.duration = 900
            break;
        case "medium":
            params.duration = 700
            break;
        case "fast":
            params.duration = 400
            break;
    }
    let $item = $(this);
    let effect = function(e) {
        let $self        = $(this),
            offsetX      = $self.offset().left,
            offsetY      = $self.offset().top,
            buttonWidth  = $self.outerWidth(),
            buttonHeight = $self.outerHeight(),
            size         = Math.max(buttonWidth, buttonHeight),
            x            = e.pageX - offsetX,
            y            = e.pageY - offsetY,
            $rippleEffect  = $('<span class="ripple-effect"></span>');
        $self.css({
            "overflow" : "hidden",
            "position" : "relative"
        });
        $self.prepend($rippleEffect);
        $rippleEffect.css({
            "position"            : "absolute",
            "top"                 : y + 'px',
            "left"                : x + 'px',
            "width"               : 0,
            "height"              : 0,
            "border-radius"       : 50 + "%",
            "background-color"    : params.dark ? "#0004" : "#fff5"
        }).animate({
            width    : size * 2,
            height   : size * 2,
            left     : '-=' + size,
            top      : '-=' + size,
            opacity  : 0
        }, params.duration, 'linear' ,function() {
            $(this).remove();
        });
    }
    let canAnimate = true;
    if(params.hover) {
        $item.on("mouseenter", function(e) {
            if(canAnimate){
                canAnimate = false;
                effect.call(this,e);
            }
        });
        $item.on("mouseleave", function(e) {
            canAnimate = true;
        });
    }
    if(params.click) {
        $item.on("click", function(e) {
            effect.call(this,e);
        });
    }
}