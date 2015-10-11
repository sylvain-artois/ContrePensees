'use strict()';

var config= {
    port: 3000
};

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var options = {
        config: {
            src: './grunt/*.js'
        },
        pkg: grunt.file.readJSON('package.json')
    };

    var configs = require('load-grunt-configs')(grunt, options);

    // Project configuration.
    grunt.initConfig(configs);

    grunt.registerTask('dev', [
        'compass:dev',
        'postcss',
        'copy:modernizr',
        'copy:jqueryDev',
        'copy:revolutionSliderStyle',
        'copy:jquerySuperfish',
        'copy:jqueryEasing',
        'uglify:dev'
    ]);

    grunt.registerTask('prod', [
        'compass:prod',
        'postcss',
        'copy:jqueryProd',
        'copy:revolutionSliderStyle',
        'uglify:prod'
    ]);
};
