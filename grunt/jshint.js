module.exports = {
    options: {
        reporter: require('jshint-stylish'),
        force: true
    },
    backend: [
        'routes/**/*.js',
        'models/**/*.js'
    ],
    frontend: [
        'public/js/*.js',
        'public/js/lib/*.js'
    ],
    server: [
        './keystone.js'
    ]
};
