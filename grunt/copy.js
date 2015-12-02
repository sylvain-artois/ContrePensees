module.exports = {
    modernizr: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/modernizr/dist/modernizr-build.js'],
        dest: 'public/js/vendor/'
    },
    'systemjs': {
        expand: true,
        flatten: true,
        src: ['node_modules/systemjs/dist/*'],
        dest: 'public/js/vendor/'
    },
    'babel': {
        expand: true,
        flatten: true,
        src: ['node_modules/babel/dist/browser.js'],
        dest: 'public/js/vendor/'
    },
    jqueryProd: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.min.js',
            'assets/vendor/jquery/dist/jquery.min.map'
        ],
        dest: 'public/js/vendor/'
    },
    jqueryDev: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.js'],
        dest: 'public/js/vendor/'
    },
    hammer: {
        expand: true,
        flatten: true,
        src: [
            'assets/vendor/hammerjs/hammer.js'
        ],
        dest: 'public/js/vendor/'
    },
    greensock:{
        expand: true,
        flatten: true,
        src: [ 'assets/vendor/gsap/src/uncompressed/TweenMax.js' ],
        dest: 'public/js/vendor/'
    },
    wait4image: {
        expand: true,
        flatten: true,
        src: [ 'assets/vendor/waitForImages/dist/jquery.waitforimages.js' ],
        dest: 'public/js/vendor/'
    },
    sidr:{
        expand: true,
        flatten: true,
        src: [ 'assets/vendor/sidr/jquery.sidr.min.js' ],
        dest: 'public/js/vendor/'
    },
    photoswipeCss:{
        expand: true,
        flatten: true,
        /* Le contenu du dossier n'est pas copié */
        src: ['assets/vendor/photoswipe/dist/photoswipe.css', 'assets/vendor/photoswipe/dist/default-skin'],
        dest: 'public/css/vendor/photoswipe'
    },
    photoswipeJs:{
        expand: true,
        flatten: true,
        src: ['assets/vendor/photoswipe/dist/photoswipe.js', 'assets/vendor/photoswipe/dist/photoswipe-ui-default.js'],
        dest: 'public/js/vendor/'
    },
    revolutionSliderScript: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/slider-revolution/src/js/jquery.themepunch.revolution.js'],
        dest: 'public/css/vendor/'
    },
    revolutionSliderStyle: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/slider-revolution/src/css/settings.css'],
        dest: 'public/css/vendor/'
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
        dest: 'public/js/vendor/'
    }
};
