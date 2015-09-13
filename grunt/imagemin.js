module.exports = {
    dynamic: { // Another target
        options: { // Target options
            optimizationLevel: 5,
        },
        files: [{
            expand: true, // Enable dynamic expansion
            cwd: 'app/', // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
            dest: 'app/' // Destination path prefix
        }]
    }
}