module.exports = {
    revolutionSlider:{
        options: {
            sourceMap: true,
            screwIE8: true,
            drop_console: false,
            mangle: false
        },
        files: {
            'public/vendor/jquery.themepunch.min.js': [
                'assets/vendor/slider-revolution/src/js/jquery.themepunch.plugins.min.js',
                'assets/vendor/slider-revolution/src/js/jquery.themepunch.revolution.js'
            ]
        }
    },
    prod: {
        options: {
            sourceMap: true,
            screwIE8: true,
            drop_console: false,
            mangle: false
        },
        files: {
            'public/js/vendor/modernizr.min.js': [
                'assets/vendor/modernizr/dist/modernizr-build.js'
            ],
            'public/js/vendor/jquery-plugin-easing-superfish.min.js': [
                'assets/vendor/jquery.easing/js/jquery.easing.js',
                'assets/vendor/superfish/dist/js/superfish.js'
            ],
            'public/js/vendor/sly-perfectScrollbar-magnificPopup.min.js': [
                'assets/vendor/sly/dist/sly.js',
                'assets/vendor/perfect-scrollbar/js/perfect-scrollbar.js',
                'assets/vendor/magnific-popup/dist/jquery.magnific-popup.js'
            ],
            'public/js/vendor/owlCarousel-jqueryFlexslider.min.js': [
                'assets/vendor/owl.carousel/dist/owl.carousel.js',
                'assets/vendor/flexslider/jquery.flexslider.js'
            ],
            'public/js/vendor/jqueryInstagram-twitterFetcher.min.js':[
                'assets/vendor/jquery-instagram/dist/instagram.js',
                'assets/vendor/twitter-fetcher/js/twitterFetcher.js'
            ]
        }
    }
};
