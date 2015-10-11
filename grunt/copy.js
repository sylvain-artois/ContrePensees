module.exports = {
    jqueryProd: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.min.js', 'assets/vendor/jquery/dist/jquery.min.map'],
        dest: 'public/vendor/'
    },
    jqueryDev: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery/dist/jquery.js'],
        dest: 'public/vendor/'
    },
    jquerySuperfish: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/superfish/dist/js/superfish.js'],
        dest: 'public/vendor/'
    },
    jqueryEasing: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/jquery.easing/js/jquery.easing.js'],
        dest: 'public/vendor/'
    },
    revolutionSliderStyle: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/slider-revolution/src/css/settings.css'],
        dest: 'public/vendor/'
    },
    modernizr: {
        expand: true,
        flatten: true,
        src: ['assets/vendor/modernizr/dist/modernizr-build.js'],
        dest: 'public/vendor/'
    }
};
