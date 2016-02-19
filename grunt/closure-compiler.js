module.exports = {
    my_target: {
        files: {
            'dest/output.min.js': ['src/js/**/*.js']
        },
        options: {
            js: '/node_modules/google-closure-library/**.js',
            externs: compilerPackage.compiler.CONTRIB_PATH + '/externs/jquery-1.9.js',
            compilation_level: 'SIMPLE',
            manage_closure_dependencies: true,
            language_in: 'ECMASCRIPT5_STRICT',
            create_source_map: 'dest/output.min.js.map',
            output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=output.min.js.map'
        }
    }
};
