// подключение gulp и плагинов
const { src, dest, watch, parallel } = require('gulp');
const scss                           = require('gulp-sass');
const autoprefix                     = require('gulp-autoprefixer');
const rename                         = require('gulp-rename');
const concatCss                      = require('gulp-concat-css');
const concatJS                       = require('gulp-concat');
const gcmq                           = require('gulp-group-css-media-queries');
// const smartGrid                      = require('smart-grid');
const prepend                        = require('gulp-append-prepend');
const uglify                         = require('gulp-uglify');
const browserSync                    = require('browser-sync').create();
const imageMin                       = require('gulp-imagemin');
const twig                           = require('gulp-twig');
const fs                             = require('fs');
let completed = 0;
let tasks = ['pages', 'styles', 'scripts', 'fonts', 'pictures', 'move'];
function setMarker() {
    completed++;
    if(completed >= tasks.length -1) {
        fs.writeFileSync(process.cwd() + '/dist/loaded_marker', '');
    }
}
// слежение за файлами
function tracking() {
    watch(['app/**/*.scss'], styles)
    watch(['app/**/*.js'], scripts)
    watch(['app/**/*.twig'], pages)
    watch(['app/pictures/**/*.*'], pictures)
    watch(['app/plugins/**/*.*'], move)
}
// локальный сервер
function browsersync() {
    browserSync.init({
        server : {
            baseDir : 'dist/'
        },
        ghostMode: false
    }, function () {
        fs.mkdir(process.cwd() + '/dist/', {recursive : true}, function () {
            fs.writeFileSync(process.cwd() + '/dist/index.html', '<div id="particles-js"></div><div class="load-text">Loading project<div class="dot-pulse"></div></div><script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script><script src="http://threejs.org/examples/js/libs/stats.min.js"></script><style>@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap");.load-text{display:flex;align-items:flex-end;font-family:"JetBrains Mono",monospace;position:absolute;top:50%;left:50%;color:#fff;font-size:60px;text-transform:uppercase;transform:translate(-50%,-50%)}.dot-pulse{position:relative;left:-9980px;width:10px;height:10px;border-radius:5px;background-color:#fff;color:#fff;box-shadow:9999px 0 0 -5px #fff;animation:dotPulse 1.5s infinite linear;animation-delay:.25s;top:-12px}.dot-pulse::after,.dot-pulse::before{content:\'\';display:inline-block;position:absolute;top:0;width:10px;height:10px;border-radius:5px;background-color:#fff;color:#fff}.dot-pulse::before{box-shadow:9984px 0 0 -5px #fff;animation:dotPulseBefore 1.5s infinite linear;animation-delay:0s}.dot-pulse::after{box-shadow:10014px 0 0 -5px #fff;animation:dotPulseAfter 1.5s infinite linear;animation-delay:.5s}@keyframes dotPulseBefore{0%{box-shadow:9984px 0 0 -5px #fff}30%{box-shadow:9984px 0 0 2px #fff}100%,60%{box-shadow:9984px 0 0 -5px #fff}}@keyframes dotPulse{0%{box-shadow:9999px 0 0 -5px #fff}30%{box-shadow:9999px 0 0 2px #fff}100%,60%{box-shadow:9999px 0 0 -5px #fff}}@keyframes dotPulseAfter{0%{box-shadow:10014px 0 0 -5px #fff}30%{box-shadow:10014px 0 0 2px #fff}100%,60%{box-shadow:10014px 0 0 -5px #fff}} body{ margin:0; font:normal 75% Arial, Helvetica, sans-serif; } canvas{ display: block; vertical-align: bottom; } /* ---- particles.js container ---- */ #particles-js{ position:absolute; width: 100%; height: 100%; background-color: #252525; background-image: url(""); background-repeat: no-repeat; background-size: cover; background-position: 50% 50%; } /* ---- stats.js ---- */ .count-particles{ background: #000022; position: absolute; top: 48px; left: 0; width: 80px; color: #13E8E9; font-size: .8em; text-align: left; text-indent: 4px; line-height: 14px; padding-bottom: 2px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; } .js-count-particles{ font-size: 1.1em; } #stats, .count-particles{ -webkit-user-select: none; margin-top: 5px; margin-left: 5px; } #stats{ border-radius: 3px 3px 0 0; overflow: hidden; } .count-particles{ border-radius: 0 0 3px 3px; }</style><script>particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});setInterval(function(){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===e.readyState&&200===e.status&&(window.location.href="/pages/")},e.open("Get","/loaded_marker"),e.send()},1e3) ;</script>');
        });
    });
}
//компиляция html
function pages() {
    return src('app/**/*.twig')
        .pipe(twig())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
        .on('end', setMarker);
}
// компиляция css
function styles() {
    return src(['app/**/*.+(css|scss)', '!app/plugins/**/*.*', '!app/styles/system.scss'])
        .pipe(prepend.prependText('@import "app/plugins/smart-grid/smart-grid.scss"; @import "app/styles/system.scss";'))
        .pipe(scss({outputStyle: 'expanded'}))
        .pipe(autoprefix({
            overrideBrowserslist: ['last 3 versions'],
        }))
        .pipe(gcmq())
        .pipe(dest('dist'))
        .pipe(concatCss("style.css"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('dist/dev'))
        .pipe(browserSync.stream())
        .on('end', setMarker);
}
// компиляция js
function scripts() {
    return src(['app/**/*.js', '!app/plugins/**/*.*'])
        .pipe(dest('dist'))
        .pipe(concatJS('script.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/dev'))
        .pipe(browserSync.stream())
        .on('end', setMarker);
}
// компиляция шрифтов
function fonts() {
    return src('app/fonts/**/*.*')
    .pipe(dest('dist/fonts'))
        .on('end', setMarker);
}
// компиляция изображений
function pictures() {
    return src('app/pictures/**/*.*')
    .pipe(imageMin())
    .pipe(dest('dist/pictures'))
    .pipe(browserSync.stream())
        .on('end', setMarker);
}
// перенос плагинов в dist
function move() {
    return src(['app/plugins/**/*.*', '!app/plugins/smart-grid/smart-grid.scss'])
    .pipe(dest('dist/plugins'))
        .on('end', setMarker);
}
// запуск режима разработки
exports.development = parallel(browsersync, tracking, pages, styles, scripts, fonts, pictures, move);
//  smart-grid
let options = {
        filename: "smart-grid",
        outputStyle: "scss",
        columns: 12,
        offset: "15px",
        mobileFirst: false,
        container: {
            maxWidth: "1440px",
            fields: "15px"
        },
        breakPoints: {
            xxl: {
                width: "1400px",
                fields: "20px"
            },
            xl: {
                width: "1024px",
            },
            lg: {
                width: "992px",
            },
            md: {
                width: "768px",
            },
            sm: {
                width: "540px",
            },
            xs: {
                width: "375px",
            }
        },
        mixinNames: {
            container: "container",
            row: "row-flex",
            rowFloat: "row-float",
            rowInlineBlock: "row-ib",
            rowOffsets: "row-offsets",
            column: "col",
            size: "size",
            columnFloat: "col-float",
            columnInlineBlock: "col-ib",
            columnPadding: "col-padding",
            columnOffsets: "col-offsets",
            shift: "shift",
            from: "from",
            to: "to",
            fromTo: "from-to",
            reset: "reset",
            clearfix: "clearfix",
            debug: "debug",
            uRowFlex: "u-row-flex",
            uColumn: "u-col",
            uSize: "u-size"
        },
        tab: "    ",
        defaultMediaDevice: "screen",
        detailedCalc: true
};
function grid(done) {
    fs.mkdir('app/plugins/smart-grid', {recursive: true}, function (err) {
        if (err) throw err;

        smartGrid('app/plugins/smart-grid', options);
        done();
    })
}
exports.grid = grid;
