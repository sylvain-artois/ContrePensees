module.exports = {
    dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    },
    html: {
        tasks: ['watch'],
        options: {
            logConcurrentOutput: true
        }
    }
};
