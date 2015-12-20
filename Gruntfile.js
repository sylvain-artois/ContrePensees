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
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            serve: {
                script: 'keystone.js',
                options: {
                    ignore: ['node_modules/**']
                }
            }
        }
    };

    var configs = require('load-grunt-configs')(grunt, options);

    // Project configuration.
    grunt.initConfig(configs);

    grunt.registerTask('dev', [
        'sass',
        'watch'
    ]);

    // load jshint
    grunt.registerTask('lint', [
        'jshint'
    ]);

    grunt.registerTask('devcss', [
        'compass:dev',
        'postcss'
    ]);

    grunt.registerTask('devfull', [
        'compass:dev',
        'postcss',
        'copy:modernizr',
        'copy:jqueryDev',
        'copy:revolutionSliderStyle',
        'copy:revolutionSliderAssets',
        'copy:allDev',
        'uglify:revolutionSlider'
    ]);

    grunt.registerTask('prodcss', [
        'compass:prod',
        'postcss'
    ]);

    grunt.registerTask('prod', [
        'compass:prod',
        'postcss',
        'copy:jqueryProd',
        'copy:revolutionSliderStyle',
        'copy:revolutionSliderAssets',
        'uglify:revolutionSlider',
        'uglify:prod'
    ]);

    // default option to connect server
    grunt.registerTask('serve', [
        'jshint',
        'concurrent:dev'
    ]);

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });
};
