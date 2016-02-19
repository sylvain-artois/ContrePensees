module.exports = {
    portfolio: {
        entry: "./public/js/portfolio.js",
        output: {
            path: "./public/js/bundle",
            filename: "portfolio-[hash].js"
        },
        module : {
            loaders: [{
                test: /.js$/,
                loader: 'babel-loader'
            }]
        }
    }
};
