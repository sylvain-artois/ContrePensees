;(function($) {
    "use strict";

    var w = $(window),
        doc = $(document),
        windowWidth = w.width(),
        nav = $(".dima-nav").outerHeight(),
        windowHeight = w.height(),
        prefix,
        isTouch = Modernizr.touch,
        isTransitions = Modernizr.csstransitions,
        isFirefox = typeof InstallTrigger !== 'undefined',
        //isIE = /*@cc_on!@*/ false || !!document.documentMode,
        isChrome = !!window.chrome,
        isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    window.PIXELDIMA = {};

    doc.ready(function(PIXELDIMA) {

        this.PIXELDIMA = PIXELDIMA || {}; //Main Namespace

        /**
         * [ Main Module (Okab) ]
         */
        PIXELDIMA.NAV = function() {

            var myMenu = function() {
                mobileNav();
                fixNav();
                //subMenu();
                searchBox();
                //onePage();
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
                //search box event
                var bool = true;
                $(".search-btn").click(function(e) {
                    e.preventDefault();
                    if (bool) {
                        $("#search-box").stop().slideDown(250, "easeOutExpo");
                        $("#search-box input[type=text]").focus();
                        bool = false;
                    } else {
                        $("#search-box").stop().slideUp(250, "easeOutExpo");
                        bool = true;
                    }
                });

                function closeSearch() {
                        $("#search-box").stop().slideUp(250, "easeOutExpo");
                    }
                    //close search btn event
                $("#close").click(function(e) {
                    e.preventDefault();
                    closeSearch();
                    bool = true;
                });
            };

            return {
                init: function () {
                    myMenu();
                    $("html").imagesLoaded();
                }
            };
        }();

        // Handles twitter,instagram,flickr API
        PIXELDIMA.API = function() {
            var tw = $("#tweet");
            var twitter = function() {
                tw.each(function() {
                    var lem = $(this),
                        id = lem.attr("data-id"),
                        type = lem.attr("data-type"),
                        t = lem.attr("data-count");

                    if (type == "quote") {
                        type = quote
                    } else {
                        type = list
                    }
                    var dima = {
                        "id": id,
                        "domId": lem,
                        "maxTweets": t,
                        "showUser": 0,
                        "showImages": 0,
                        "showRetweet": !0,
                        "customCallback": type,
                        "showInteraction": 0,
                        "enableLinks": 1
                    };

                    function list(tweets) {
                        var x = tweets.length;
                        var n = 0;
                        var element = document.getElementById('tweet');
                        var html = '<ul class="with-border tweet_list slides">';
                        while (n < x) {
                            html += '<li>' + tweets[n] + '</li>';
                            n++;
                        }
                        html += '</ul>';
                        element.innerHTML = html;
                    }

                    function quote(tweets) {
                        var x = tweets.length;
                        var n = 0;
                        var element = document.getElementById('tweet');
                        var html = '';
                        while (n < x) {
                            html += '<div class=\"dima-testimonial quote-style\"><blockquote class=\"without-icon\">' + tweets[n] + '</div></blockquote>';
                            n++;
                        }
                        html += '';
                        element.innerHTML = html;
                    }
                    twitterFetcher.fetch(dima);
                });

            };
            var instagram = function() {

                function createPhotoElement(photo) {
                    var innerHtml = $('<img>')
                        .addClass('instagram-image')
                        .attr('src', photo.images.thumbnail.url);

                    innerHtml = $('<a>')
                        .attr('target', '_blank')
                        .attr('href', photo.link)
                        .append(innerHtml);

                    return $('<li>')
                        .addClass('instagram-placeholder')
                        .attr('id', photo.id)
                        .append(innerHtml);
                }

                function didLoadInstagram(event, response) {
                    /*jshint validthis:true */
                    var that = this;
                    $.each(response.data, function(i, photo) {
                        $(that).append(createPhotoElement(photo));
                    });
                }
                var lem = $(".dima-instagram"),
                    d = lem.attr("data-limit") || 6,
                    i = lem.attr("data-userId"),
                    m = lem.attr("data-hash"),
                    a = lem.attr("data-accessToken"),
                    h = lem.attr("data-clientId") || 'baee48560b984845974f6b85a07bf7d9';

                lem.on('didLoadInstagram', didLoadInstagram);

                if (m != undefined) {
                    lem.instagram({
                        hash: m,
                        count: d,
                        clientId: h
                    });
                } else if (i != undefined && a != undefined) {
                    lem.instagram({
                        userId: i,
                        accessToken: a,
                        count: d,
                    });
                }
            };

            return {
                init: function() {
                    twitter();
                    instagram();
                }
            };
        }();

        // Handles scrollable contents using jQuery sly and perfect scrollbar  
        PIXELDIMA.SCROLL = function() {

            var localScroll = function() {
                $(".dima-nav").localScroll({
                    target: "body",
                    axis: "y",
                    duration: 800,
                    margin: true,
                    offset: -(nav - 13)
                });
            };

            var callingSly = function() {
                /*var slyOptions = {
                    scrollBy: 200,
                    speed: 600,
                    smart: 0,
                    easing: 'easeOutQuart',
                    scrollBar: '.scrollbar',
                    dynamicHandle: 1,

                    dragHandle: 0,
                    clickBar: 1,
                    contentEditable: 1,
                    mouseDragging: 0,
                    touchDragging: 1,
                    releaseSwing: 1,
                    swingSpeed: 0.1,
                    elasticBounds: 1,
                    cycleBy: null,
                    cycleInterval: 4000
                };
                var d = new Sly('#framee', slyOptions);
                d.init();*/
            };

            var parallax = function() {

                if (isFirefox) {
                    prefix = '-moz-';
                } else if (isChrome || isSafari) {
                    prefix = '-webkit-';
                }

                $('.background-image-hide,.background-image-holder').each(function() {
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
                // Init Skrollr
                if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
                    var skr = skrollr.init({
                        forceHeight: false,
                        smoothScrolling: true,
                    });
                    // Refresh Skrollr after resizing our sections
                    skr.refresh($(".homeSlide"));
                }
            };

            return {
                init: function() {
                    localScroll();
                    parallax();
                    callingSly();
                }
            };
        }();

        PIXELDIMA.ANIMATION = function() {

            var animations = function() {
                var elm = $("[data-animate]");
                elm.each(function() {
                    var elm = $(this),
                        dataDelay = elm.attr("data-delay") || 0,
                        offsetVal = elm.attr("data-offset") || "100%",
                        trgger = elm.attr("data-trgger") || "false",
                        a = 0;
                    var dataAnimate = elm.attr("data-animate");
                    if (a = dataDelay ? Number(dataDelay) + 10 : 300, !elm.hasClass("animated")) {
                        $(this).addClass('opacity-zero');
                        elm.waypoint(function() {
                            var $this = $(this);
                            setTimeout(function() {
                                $this.addClass('show animated ' + dataAnimate);
                            }, a);
                        }, {
                            offset: offsetVal,
                            triggerOnce: trgger
                        });
                    }

                })
            };

            var notAnimations = function() {
                var elm = $("[data-animate]");
                elm.each(function() {
                    var elm = $(this),
                        dataDelay = elm.attr("data-delay") || 0,
                        offsetVal = elm.attr("data-offset") || "100%",
                        trgger = elm.attr("data-trgger") || "false",
                        a = 0;
                    if (a = dataDelay ? Number(dataDelay) + 300 : 300, !elm.hasClass("animated")) {
                        $(this).addClass('opacity-zero');
                        elm.waypoint(function() {
                            var $this = $(this);
                            setTimeout(function() {
                                $this.animate({
                                    opacity: 1
                                }, {
                                    step: function(now, fx) {
                                        var X = 100 * now;
                                        $(fx.elem).css("filter", "alpha(opacity=" + X + ")");
                                    }
                                });
                            }, a);
                        }, {
                            offset: offsetVal,
                            triggerOnce: trgger
                        });
                    }

                })
            };

            var twoLinesHover = function() {
                $('.link_overlay.two_lines').each(function() {
                    var h = $(this).width();
                    var t = (h - 130) / 2;
                    $(this).find('ul').css({
                        'margin-left': t,
                        'margin-right': t
                    })
                });
                $('.work-info').each(function() {
                    var h = $(this).parent().outerHeight();
                    if (h <= 100) {
                        h = $(this).parent().outerHeight();
                    }
                    var t = h - ((h / 2) + 75);
                    //console.log(h)
                    $(this).css({
                        'bottom': t
                    })
                });
            };

            var init = function() {
                if (!Modernizr.mq('only all and (max-width: 480px)')) {
                    if (isTransitions) {
                        animations();
                    } else {
                        notAnimations();
                    }
                }

                twoLinesHover();
            };

            return {
                init: init,
                twoLinesHover: twoLinesHover
            };
        }();

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
                var d, i, m, a, p;

                d = $(".fullscreenOnePage").show().revolution({
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

                /*i = $(".fullscreen").show().revolution({
                    dottedOverlay: "none",
                    delay: 16000,
                    startwidth: 1140,
                    startheight: 550,
                    hideThumbs: 200,

                    thumbWidth: 100,
                    thumbHeight: 50,
                    thumbAmount: 5,

                    navigationType: "bullet",
                    navigationArrows: "solo",
                    navigationStyle: "none",

                    touchenabled: "on",
                    onHoverStop: "on",

                    swipe_velocity: 0.7,
                    swipe_min_touches: 1,
                    swipe_max_touches: 1,
                    drag_block_vertical: false,

                    parallax: "mouse",
                    parallaxBgFreeze: "on",
                    parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                    keyboardNavigation: "off",

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
                    fullWidth: "on",
                    fullScreen: "off",

                    spinner: "spinner4",

                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,

                    shuffle: "off",

                    autoHeight: "off",
                    forceFullWidth: "off",

                    hideThumbsOnMobile: "off",
                    hideNavDelayOnMobile: 1500,
                    hideBulletsOnMobile: "off",
                    hideArrowsOnMobile: "off",
                    hideThumbsUnderResolution: 0,

                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    startWithSlide: 0,
                    fullScreenOffsetContainer: "header"
                });

                m = jQuery('.minfullwidth').show().revolution({
                    delay: 15000,
                    dottedOverlay: "none",
                    startwidth: 1170,
                    startheight: 500,
                    hideThumbs: 10,
                    fullWidth: "on",
                    navigationType: "bullet",
                    navigationArrows: "solo",
                    navigationStyle: "none",
                    touchenabled: "on",
                    onHoverStop: "on",
                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 35,
                    fullScreenOffsetContainer: "header"
                });

                a = jQuery('.boxedcontainer').show().revolution({
                    delay: 15000,
                    startwidth: 1170,
                    startheight: 450,
                    hideThumbs: 10,
                    fullWidth: "off",
                    forceFullWidth: "off",
                    navigationType: "bullet",
                    navigationArrows: "solo",
                    navigationStyle: "none",
                    touchenabled: "on",
                    onHoverStop: "on",
                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 35,
                    fullScreenOffsetContainer: ""
                });

                p = jQuery('.photoslide').show().revolution({
                    delay: 4000,
                    startwidth: 1170,
                    startheight: 500,
                    hideThumbs: 0,
                    thumbWidth: 42,
                    thumbHeight: 50,
                    thumbAmount: 10,
                    navigationType: "thumb",
                    navigationArrows: "solo",
                    navigationStyle: "round",
                    fullWidth: "off",
                    fullScreen: "on",
                    soloArrowLeftHalign: "left",
                    soloArrowLeftValign: "center",
                    soloArrowLeftHOffset: 20,
                    soloArrowLeftVOffset: 0,
                    soloArrowRightHalign: "right",
                    soloArrowRightValign: "center",
                    soloArrowRightHOffset: 20,
                    soloArrowRightVOffset: 0,
                    shadow: 0,
                    touchenabled: "on",
                    onHoverStop: "on",
                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 35,
                    fullScreenOffsetContainer: ""
                });*/
            };

            return {
                init: function() {
                    flexSlider();
                    owlSlider();
                    revolution();
                },
                flexSlider: flexSlider,
                revolution: revolution
            };
        }();

        PIXELDIMA.LIGHTBOX = function() {
            var lightBox = function() {
                var d = $('[data-lightbox="image"]'),
                    i = $('[data-lightbox="iframe"]'),
                    m = $('[data-lightbox="ajax"]'),
                    a = $('[data-lightbox="gallery"]');
                //image    
                d.magnificPopup({
                    type: 'image',
                    closeOnContentClick: !0,
                    closeBtnInside: !1,
                    fixedContentPos: !0,
                    mainClass: "mfp-zoom-in",
                    image: {
                        verticalFit: !0
                    }
                });
                //gallery
                a.each(function() {
                    $(this).magnificPopup({
                        delegate: 'a.gallery-item',
                        type: 'image',
                        overflowY: 'scroll',
                        closeOnContentClick: !0,
                        closeBtnInside: !1,
                        fixedContentPos: !0,
                        mainClass: "mfp-zoom-in",
                        image: {
                            verticalFit: !0
                        },
                        gallery: {
                            enabled: !0,
                            navigateByImgClick: !0,
                            preload: [0, 1]
                        }
                    });
                });
                //iframe ( map, youtube ...)
                i.magnificPopup({
                    disableOn: 500,
                    type: 'iframe',
                    mainClass: 'mfp-zoom-in',
                    removalDelay: 160,
                    preloader: 0,
                    fixedContentPos: 0
                });

                //Stop suggested video from youtube
                $('a[href*="youtube.com/watch"]').magnificPopup({
                    type: 'iframe',
                    iframe: {
                        patterns: {
                            youtube: {
                                index: 'youtube.com',
                                id: 'v=',
                                src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                            }
                        }
                    }
                });

                //Ajax
                m.magnificPopup({
                    type: 'ajax',
                    closeBtnInside: 0,
                    alignTop: 1,
                    cache: 1,
                    overflowY: 'scroll',
                    mainClass: "mfp-zoom-in",
                    callbacks: {
                        ajaxContentAdded: function() {
                            PIXELDIMA.SLIDE.flexSlider();
                            PIXELDIMA.SHOP.init();
                            PIXELDIMA.UI.init();
                            //PIXELDIMA.SCROLL.init();
                        }
                    }
                });
            };

            var init = function() {
                lightBox();
            }

            var build = {
                init: init,
                lightBox: lightBox,
            };

            return build;
        }();

        PIXELDIMA.MEDIA = function() {
            return {
                init: $.noop
            };
        }();

        PIXELDIMA.UI = function() {

            var progress = function() {
                //progress bar animation
                setTimeout(function() {
                    $(".progress,.dial").waypoint(function() {
                        $(".progress .progress-bar").each(function() {
                            var el = $(this),
                                perc = el.attr("aria-valuenow"),
                                current_percent = 0,
                                progress = setInterval(function() {
                                    if (current_percent >= perc) {
                                        clearInterval(progress);
                                    } else {
                                        current_percent += 1;
                                        el.css("width", (current_percent) + "%");
                                    }
                                }, 1);
                        });

                        //progress bar color
                        $('.progress').append(function() {
                            var elm = $(this),
                                color = elm.attr("data-color-val");
                            elm.css('border-color', color);
                            elm.find('.progress-bar').css('background-color', color);
                            elm.find('.progress-bar .percent').css('background-color', color);
                            elm.find('span').css('border-top-color', color);
                        });

                    }, {
                        offset: "100%",
                        triggerOnce: true
                    });
                }, 300);
            };

            var notification = function() {
                $(".dima-alert button.close").click(function() {
                    $(this).parent().fadeOut(200, "easeOutExpo");
                });
            };

            var element_bg = function() {
                var elm = $("[data-element-bg]");
                var b = elm.attr("data-element-bg");
                elm.css({
                    "background-image": "url(" + b + ")",
                    "background-position": "100% 100%",
                    "background-repeat": "no-repeat",
                });
            };

            return {
                init: function() {
                    progress();
                    notification();
                    element_bg();
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
                init: function() {
                    event();
                }
            };
        }();

        // handle the layout reinitialization on window resize
        PIXELDIMA.DOCONRESIZE = function() {

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

            var parentSize = function() {
                if (windowWidth > 767) {
                    $('.set-parent-height').each(function() {
                        var parentHeight = $(this).parent().height();
                        $(this).css("height", parentHeight);
                    });
                }
            };

            return {
                init: function() {
                    nav();
                    parentSize();
                    PIXELDIMA.ANIMATION.twoLinesHover();
                    responsiveFlexSlider();
                }
            };
        }();

        // runs callback functions
        PIXELDIMA.OKABREADY = function() {
            return {
                init: function() {
                    //Please don't change the order
                    PIXELDIMA.SLIDE.init();
                    PIXELDIMA.LIGHTBOX.init();
                    PIXELDIMA.MEDIA.init();
                    PIXELDIMA.ANIMATION.init();
                    PIXELDIMA.NAV.init();
                    //PIXELDIMA.SCROLL.init();
                    PIXELDIMA.UI.init();
                    PIXELDIMA.API.init();
                    PIXELDIMA.EVENT.init();

                    w.resize(function() {
                        PIXELDIMA.DOCONRESIZE.init();
                    });
                }
            };
        }();

        PIXELDIMA.OKABREADY.init();
    });
}($));
