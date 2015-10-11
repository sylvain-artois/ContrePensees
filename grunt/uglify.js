module.exports = {
    dev:{
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
            'public/vendor/jquery-plugin-easing-superfish.min.js': [
                'assets/vendor/jquery.easing/js/jquery.easing.js',
                'assets/vendor/superfish/dist/js/superfish.js'
            ],
            'public/vendor/jquery.themepunch.min.js': [
                'assets/vendor/slider-revolution/src/js/jquery.themepunch.plugins.min.js',
                'assets/vendor/slider-revolution/src/js/jquery.themepunch.revolution.js'
            ],
            'public/vendor/modernizr.min.js': [
                'assets/vendor/modernizr/dist/modernizr-build.js'
            ]
        }
    }
};
