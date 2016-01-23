module.exports = {
    systemjs: {
        options: {
            sfx: true,
            configFile: "./public/js/config.js",
            minify: true,
            build: {
                mangle: false
            }
        },
        dist: {
            files: [{
                "src":  "./public/js/resume.js",
                "dest": "./public/js/bundles/resume.min.js"
            }]
        }
    }
};
