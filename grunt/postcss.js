module.exports = {
    options: {
        processors: [
            require('autoprefixer')({
                browsers: ['last 2 versions', 'ie 9', 'bb 10', 'android 3']
            })
        ]
    },
    dist: {
        src: 'public/css/front.css'
    }
};