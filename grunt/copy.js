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
        src: ['assets/vendor/photoswipe/dist/photoswipe.js'],
        dest: 'public/js/vendor/'
    },
    scrollaxdev:{
        expand: true,
        flatten: true,
        src: ['assets/vendor/Scrollax.js/scrollax.js'],
        dest: 'public/js/vendor/'
    },
    scrollaxprod:{
        expand: true,
        flatten: true,
        src: ['assets/vendor/Scrollax.js/scrollax.min.js'],
        dest: 'public/js/vendor/'
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
