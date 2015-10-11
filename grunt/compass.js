module.exports = {
    dev: {
        options: {
            config: 'assets/styles/config.rb',
            outputStyle: 'nested',
            force: true
        }
    },
    prod: {
        options: {
            config: 'public/config.rb',
            environment: 'production',
            outputStyle: 'compressed',
            force: true,
            sourcemap: true
        }
    }
};
