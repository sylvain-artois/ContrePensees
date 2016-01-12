module.exports = {
    js: {
        files: [
            'model/**/*.js',
            'routes/**/*.js'
        ],
        tasks: ['concurrent:dev']
    },
    express: {
        files: [
            'keystone.js'
        ],
        tasks: ['concurrent:dev']
    },
    html: {
        files: [
            'templates/**/*.html'
        ],
        tasks: ['concurrent:html']
    },
    compass: {
        files: ['assets/styles/sass/**/*.scss'],
        tasks: ['compass:dev']
    },
    livereload: {
        files: [
            'public/css/**/*.css',
            'public/js/**/*.js'
        ],
        options: {
            livereload: true
        }
    }
};
