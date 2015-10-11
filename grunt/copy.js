module.exports = {
    modernizr: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/modernizr/dist/modernizr-build.js'],
        dest: 'public/vendor/'
    },
    jqueryProd: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.min.js',
            'assets/vendor/jquery/dist/jquery.min.map'
        ],
        dest: 'public/vendor/'
    },
    jqueryDev: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.js'],
        dest: 'public/vendor/'
    },
    revolutionSliderStyle: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/slider-revolution/src/css/settings.css'],
        dest: 'public/vendor/'
    },
    revolutionSliderAssets: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/slider-revolution/src/assets/*'],
        dest: 'public/assets'
    },

    allDev: {
        expand: true,
        flatten: true,
        src: [
            'assets/vendor/superfish/dist/js/superfish.js',
            'assets/vendor/jquery.easing/js/jquery.easing.js',
            'assets/vendor/sly/dist/sly.js',
            'assets/vendor/perfect-scrollbar/js/perfect-scrollbar.js',
            'assets/vendor/magnific-popup/dist/jquery.magnific-popup.js',
            'assets/vendor/jquery-instagram/dist/instagram.js',
            'assets/vendor/twitter-fetcher/js/twitterFetcher.js',
            'assets/vendor/owl.carousel/dist/owl.carousel.js',
            'assets/vendor/flexslider/jquery.flexslider.js'
        ],
        dest: 'public/vendor/'
    }
};
