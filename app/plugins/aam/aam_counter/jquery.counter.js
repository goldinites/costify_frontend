$.fn.intCounter = function(params={}){
    let defaults = {
        duration : 3500,
        indent   : 0,
        float    : 0
    };
    params = Object.assign(defaults, params);
    let $window = $(window),
        $self   = $(this),
        animate = function () {
            $self.each(function(index, element) {
                let numCount = $(element).data('num'),
                    elementOffsetTop = $(element).offset().top;
                if(typeof(numCount) != 'number'){
                    return;
                }
                if($window.scrollTop() + $window.height() >= elementOffsetTop + params.indent){
                    $(element).animate({ num: numCount -1 }, {
                        duration: params.duration,
                        step: function (num){
                            $(this).text((num + 1).toFixed(params.float))
                            if($(element).text() >= numCount) {
                                $(element).animate().stop();
                            }
                        }
                    });
                }
            });
        }
    $window.scroll(function(){
        animate();
    });
    animate();
}