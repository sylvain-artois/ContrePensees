;(function($) {
    "use strict";

    var w = $(window),
        doc = $(document),
        windowWidth = w.width(),
        nav = $(".dima-nav").outerHeight(),
        windowHeight = w.height(),
        prefix,
        isTouch = Modernizr.touch,
        hasCssTransition = Modernizr.csstransitions,
        isFirefox = typeof InstallTrigger !== 'undefined',
        //isIE = /*@cc_on!@*/ false || !!document.documentMode,
        isChrome = !!window.chrome,
        isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    window.PIXELDIMA = {};

    doc.ready(function(PIXELDIMA) {

        this.PIXELDIMA = PIXELDIMA || {};

        /**
         * Init flexSlider, owlSlider, revolution
         *
         * @type {{init, flexSlider, revolution}}
         */
        PIXELDIMA.SLIDE = function() {

            var flexSlider = function() {
                var D = $(".flexslider");
                D.each(function() {
                    var elm = $(this);
                    var d = elm.attr("data-animation") || 'slide';
                    var i = elm.attr("data-easing") || 'swing';
                    var m = elm.attr("data-direction") || 'horizontal';
                    var a = elm.attr("data-autoplay");
                    var o = elm.attr("data-show") || 7000;
                    var k = elm.attr("data-speed") || 700;
                    var b = elm.attr("data-video") || 0;
                    var e = elm.attr("data-nav") || 1;
                    var z = elm.attr("data-arrows") || 1;
                    var p = elm.attr("data-loop") || !1;
                    var h = 0;
                    var r = 1;


                    elm.css('height', 'auto').flexslider({
                        selector: ".slides > .slide-item",
                        animation: d,
                        easing: i,
                        slideshow: !a,
                        direction: m,
                        slideshowSpeed: Number(o),
                        animationSpeed: Number(k),
                        video: b,
                        controlNav: e,
                        directionNav: z,
                        animationLoop: p,
                        useCSS: r,
                        smoothHeight: h,
                        pauseOnHover: h,
                        mousewheel: h,
                        multipleKeyboard: r,
                        start: function() {
                            PIXELDIMA.LIGHTBOX.lightBox();
                        },
                        after: function() {}
                    });
                })
            };
            var owlSlider = function() {

                $(".owl-carousel").each(function(e) {
                    var elm = $(this),
                        d = elm.attr("data-owl-namber") || 1,
                        i = elm.attr("data-owl-autoPlay"),
                        m = elm.attr("data-owl-navigation") || false,
                        a = elm.attr("data-owl-pagination"),
                        p = elm.attr("data-owl-mousewheel"),
                        e = elm.attr("data-owl-loop") || true,
                        phone = elm.attr("data-owl-phone") || 1,
                        tablet = elm.attr("data-owl-tablet") || 1,
                        margin_val = parseInt(elm.attr("data-owl-margin")) || 0;

                    if (i === "true") {
                        i = true;
                    } else {
                        i = false;
                    }
                    if (a === "true") {
                        a = true;
                    } else {
                        a = false;
                    }

                    // Custom Navigation Events
                    if (m === "true") {
                        m = true;
                        elm.next().css("display", "block");

                        $(".next").click(function() {
                            elm.trigger('next.owl.carousel');
                        });
                        $(".prev").click(function() {
                            elm.trigger('prev.owl.carousel', [300]);
                        });

                    } else {
                        m = false;
                    }
                    elm.owlCarousel({
                        items: d,
                        margin: margin_val,
                        nav: m,
                        dots: a,
                        slideSpeed: 500,
                        dotsSpeed: 400,
                        autoplay: i,
                        rtl: true,
                        lazyLoad: true,
                        loop: e,
                        responsiveClass: true,
                        responsive: {
                            250: {
                                items: phone
                            },
                            480: {
                                items: tablet
                            },
                            768: {
                                items: tablet
                            },
                            989: {
                                items: tablet
                            },
                            1199: {
                                items: d
                            }
                        }
                    });
                    if (p === "true") {
                        elm.bind('mousewheel', '.owl-stage', function(e) {
                            e.preventDefault();
                            if (e.originalEvent.wheelDelta > 0) {
                                elm.trigger('next.owl.carousel');
                            } else {
                                elm.trigger('prev.owl.carousel', [300]);
                            }
                            e.preventDefault();
                        });
                    }
                });
            };
            var revolution = function() {
                $(".fullscreenOnePage").show().revolution({
                    dottedOverlay: "none",
                    delay: 9000,
                    startwidth: 1170,
                    startheight: 700,
                    hideThumbs: 200,
                    thumbWidth: 100,
                    thumbHeight: 50,
                    thumbAmount: 5,
                    navigationType: "bullet",
                    navigationArrows: "solo",
                    navigationStyle: "none",

                    touchenabled: "on",
                    onHoverStop: "on",

                    parallax: "mouse",
                    parallaxBgFreeze: "on",

                    swipe_velocity: 0.7,
                    swipe_min_touches: 1,
                    swipe_max_touches: 1,
                    drag_block_vertical: false,

                    keyboardNavigation: "on",

                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 20,

                    soloArrowLeftHalign: "left",
                    soloArrowLeftValign: "center",
                    soloArrowLeftHOffset: 20,
                    soloArrowLeftVOffset: 0,

                    soloArrowRightHalign: "right",
                    soloArrowRightValign: "center",
                    soloArrowRightHOffset: 20,
                    soloArrowRightVOffset: 0,

                    shadow: 0,
                    fullWidth: "off",
                    fullScreen: "on",

                    spinner: "spinner0",

                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,

                    shuffle: "off",

                    forceFullWidth: "off",
                    fullScreenAlignForce: "off",
                    minFullScreenHeight: "400",

                    hideThumbsOnMobile: "off",
                    hideNavDelayOnMobile: 1500,
                    hideBulletsOnMobile: "off",
                    hideArrowsOnMobile: "off",
                    hideThumbsUnderResolution: 0,

                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    startWithSlide: 0,
                    fullScreenOffsetContainer: ""
                });
            };

            return {
                init: function(options) {

                    var slideOptions = (options && "slide" in options) ? options.slide : {};

                    if (slideOptions.flex) {
                        flexSlider();
                    }
                    if (slideOptions.owl) {
                        owlSlider();
                    }
                    if (slideOptions.revolution) {
                        revolution();
                    }
                },
                flexSlider: flexSlider,
                revolution: revolution
            };
        }();

        PIXELDIMA.NAV = function() {

            var initNavigation = function() {
                mobileNav();
                fixNav();
                subMenu();
                searchBox();
            };

            var mobileNav = function() {
                var d = $(".dima-nav"),
                    i = $("a.dima-btn-nav");
                /**
                 * [Click Mobile button]
                 */
                i.click(function(event) {
                    event.preventDefault();
                    if (i.hasClass("btn-active")) {
                        d.slideUp();
                        i.removeClass("btn-active");
                    } else {
                        i.addClass("btn-active");
                        d.slideDown();
                    }
                });
                $('.mobnav-subarrow').click(function() {
                    $(this).parent().toggleClass("xpopdrop");
                });
            };
            var fixNav = function() {

                $.fn.fix_navbar = function(el) {

                    el = $(this);
                    el.addClass("fix_nav");
                    var clean_nav = $(".dima"),
                        topBar = $('.dima-topbar').outerHeight() || 0,

                        fixAll = function(el) {
                            var parent = (el).parent(),
                                offsetTop = parent.offset().top + topBar;
                            if (doc.scrollTop() > offsetTop) {
                                if (doc.scrollTop() > (el.height() - w.height())) {
                                    el.addClass("fixed");
                                    if (windowWidth > 989) {
                                        clean_nav.addClass("clear-nav").css("padding-top", el.outerHeight()).show();
                                    }
                                } else {
                                    $('.dima-navbar-wrap .dima-navbar .logo img.one').addClass('hide');
                                    el.removeClass("fixed");
                                    clean_nav.removeClass("clear-nav").hide();
                                }
                            } else {
                                el.removeClass("fixed");
                                clean_nav.removeClass("clear-nav").hide();
                            }
                        };

                    w.scroll(function() {
                        fixAll(el);
                    });
                    w.ready(function() {
                        fixAll(el);
                    });
                };

                $.fn.show_navbar = function(el) {

                    el = $(this);
                    el.addClass("fix_nav");
                    PIXELDIMA.SLIDE.revolution();

                    var clean_nav = $(".dima"),
                        offsetBy = el.attr("data-offsetBy"),
                        topBar = $('.dima-topbar').outerHeight() || 0,
                        oFFset = $(offsetBy).outerHeight() || 0,
                        menuVal = $('.dima-navbar').outerHeight() || 0,

                        fixAll = function(el) {
                            var parent = (el).parent(),
                                offsetTop = parent.offset().top + topBar + oFFset + menuVal;
                            if (doc.scrollTop() > offsetTop) {
                                if (doc.scrollTop() > (el.height() - w.height())) {
                                    el.addClass("fixed animated fadeInDown");
                                    if (windowWidth > 989) {
                                        clean_nav.addClass("clear-nav").css("padding-top", el.outerHeight()).show();
                                    }
                                } else {
                                    $('.dima-navbar-wrap .dima-navbar .logo img.one').addClass('hide');
                                    el.removeClass("fixed animated fadeInDown");
                                    clean_nav.removeClass("clear-nav").hide();
                                }
                            } else {
                                el.removeClass("fixed animated fadeInDown");
                                clean_nav.removeClass("clear-nav").hide();
                            }
                        };

                    w.scroll(function() {
                        fixAll(el);
                    });
                    w.ready(function() {
                        fixAll(el);
                    });
                };
            };
            var searchBox = function() {

                var flag        = true,
                    $searchBox  = $("#search-box"),
                    $searchBtn  = $(".search-btn"),
                    $close      = $("#close"),
                    $searchForm = $("[name=\"searchForm\"]"),
                    $freeTextSearch = $("[name=\"freeTextSearch\"]")

                $searchBtn.click(function(e) {
                    e.preventDefault();
                    if (flag) {
                        $searchBox.stop().slideDown(250, "easeOutExpo");
                        $freeTextSearch.focus();
                    } else {
                        $searchBox.stop().slideUp(250, "easeOutExpo");
                    }
                    flag = !flag;
                });

                function closeSearch() {
                    $searchBox.stop().slideUp(250, "easeOutExpo");
                }

                //close search btn event
                $close.click(function(e) {
                    e.preventDefault();
                    closeSearch();
                    flag = true;
                });

                $searchForm.submit(function(e){
                    var searchString = encodeURI($freeTextSearch.val());
                    $searchForm.attr('action', '/search/' + searchString);
                    //avoid query string
                    $freeTextSearch.remove();
                });
            };
            var subMenu = function() {

                $("ul.sf-menu").superfish({
                    delay: 650,
                    animation: {
                        opacity: 'show',
                        height: 'show'
                    },
                    hoverClass: 'sfHover',
                    pathClass: 'overrideThisToUse',
                    pathLevels: 1,
                    animationOut: {
                        opacity: 'hide',
                        height: 'hide'
                    },
                    speed: 'normal',
                    eventType: 'toggle',
                    speedOut: 'fast',
                    disableHI: false,
                    autoArrows: 'false'

                });
            };

            return {
                init: function (options) {
                    var navOptions = (options && "menu" in options) ? options.menu : {};
                    initNavigation();
                    if (navOptions.imagesLoaded) {
                        $("html").imagesLoaded();
                    }
                }
            };
        }();

        PIXELDIMA.SCROLL = function() {

            var parallax = function() {

                if (isFirefox) {
                    prefix = '-moz-';
                } else if (isChrome || isSafari) {
                    prefix = '-webkit-';
                }

                $('.background-image-hide, .background-image-holder').each(function() {
                    var imgSrc = $(this).children('img').attr('src');
                    if (typeof imgSrc !== typeof undefined) {
                        $(this).css('background', 'url("' + imgSrc + '")');
                        $(this).children('img').hide();
                        $(this).css('background-position', '0% 0%');
                    }
                });

                $('.parallax-background').each(function() {
                    $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-200px, 0px);');
                    $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px);');
                    $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px);');
                    $(this).attr('data-direction', 'vertical');
                });
            };

            return {
                init: function(options) {
                    var scrollOptions = (options && "scroll" in options) ? options.scroll : {};
                    if (scrollOptions.parallax) {
                        parallax();
                    }
                }
            };
        }();

        PIXELDIMA.EVENT = function() {

            var event = function() {

                //Fix The Navbar 
                if (windowWidth > 960) {
                    if ($('.dima-navbar').hasClass('fix-one')) {
                        $(".fix-one").fix_navbar();
                    }
                    if ($('.dima-navbar').hasClass('fix-two')) {
                        $(".fix-two").show_navbar();
                    }
                }

                if (windowWidth < 980) {
                    $('.dima-nav-end ul').css("top", "-1000px");
                } else {
                    $('.dima-nav-end ul').css("top", "100px");
                }

                //Set parent height
                if (windowWidth > 767) {
                    $('.set-parent-height').each(function() {
                        var parentHeight = $(this).parent().height();
                        $(this).css("height", parentHeight);
                    });
                }
                //Add class active Based on URL http://css-tricks.com/snippets/jquery/add-active-navigation-class-based-on-url/
                $('.sidebar li a[href^="' + location.pathname.split("/")[2] + '"]').parent().addClass('active');


                $('.section-colored').each(function() {
                    var bg = $(this).attr("data-bg");
                    $(this).css("background-color", bg);
                });

            };

            return {
                init: function(options) {

                    var eventOptions = (options && "event" in options) ? options.event : {};

                    if (! eventOptions.disable) {
                        event();
                    }
                }
            };
        }();

        PIXELDIMA.RESIZE = function() {

            var nav = function() {
                windowWidth = w.width();
                if ($('.dima-navbar').hasClass('fix-one')) {
                    $(".fix-one").fix_navbar();
                }
                if ($('.dima-navbar').hasClass('fix-two')) {
                    $(".fix-two").show_navbar();
                }

                if (windowWidth < 980) {
                    $('.dima-nav-end ul').css("top", "-1000px");
                } else {
                    $('.dima-nav-end ul').css("top", "100px");
                }
            };

            var responsiveFlexSlider = function() {
                var x = $(".flexslider .slides").outerHeight();
                if (x < windowHeight) {
                    $('.flexslider').height(x);
                } else {
                    $('.flexslider').height(windowHeight);
                }
            };

            return {
                init: function() {
                    nav();
                    responsiveFlexSlider();
                }
            };
        }();

        PIXELDIMA.READY = function() {

            var options = window.application.options || {};

            return {

                init: function() {

                    PIXELDIMA.SLIDE.init(options);
                    PIXELDIMA.NAV.init(options);
                    PIXELDIMA.SCROLL.init(options);
                    PIXELDIMA.EVENT.init(options);

                    w.resize(function() {
                        PIXELDIMA.RESIZE.init();
                    });
                }
            };
        }();

        PIXELDIMA.READY.init();
    });
}(jQuery));
