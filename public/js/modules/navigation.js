/**
 * [ Main Module (Okab) ]
 */
PIXELDIMA.NAV = function() {
    /**
     * Our Private Functions
     **/

    var myMenu = function() {
        mobileNav();
        fixNav();
        subMenu();
        searchBox();
        onePage();
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
    var onePage = function() {
        $('.dima-onepage').onePageNav({
            currentClass: 'current',
            changeHash: true,
            scrollSpeed: 750,
            scrollThreshold: 0.5,

            filter: '',
            easing: 'swing',
            begin: function() {
                //I get fired when the animation is starting
                $('body').append('<div id="device-dummy" style="height: 1px;"></div>');
            },
            end: function() {
                //I get fired when the animation is ending
                $('#device-dummy').remove();
            },
            scrollChange: function() {
                //I get fired when you enter a section and I pass the list item of the section
            }
        });

        $("a[data-scrollto]").click(function(event) {

            event.preventDefault();
            var divScrollToAnchor = $(this).attr('data-scrollto');

            var topOffsetScroll = 0;

            $('html, body').stop().animate({
                'scrollTop': $(divScrollToAnchor).offset().top - topOffsetScroll
            }, 750, 'easeOutQuint');
            return false;
        });

    };
    /**
     * Setup Function
     */
    var init = function() {
        myMenu();
        $("html").imagesLoaded(); // Detect when images have been loaded.
    };

    /**
     * [Our Public Function Here]
     */
    var build = {
        init: init,
    };
    return build;
}();
