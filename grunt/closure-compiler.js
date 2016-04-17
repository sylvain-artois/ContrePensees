/**
 * java -jar node_modules/google-closure-compiler/compiler.jar 
 * @type {{home: {files: {[public/js/bundle/home.min.js]: string[]}, options: {compilation_level: string, language_in: string, language_out: string, create_source_map: string, externs: string[]}}}}
 */
module.exports = {
    home: {
        files: {
            'public/js/bundle/home.min.js': [
                'public/js/home.js',
                'public/js/lib/OffCanvasMenu.js',
                'public/js/lib/TopbarShrink.js'
            ]
        },
        options: {
            compilation_level: 'SIMPLE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            create_source_map: 'public/js/bundle/home.min.js.map',
            externs: [
                'public/js/vendor/jquery.min.js',
                'public/js/vendor/jquery.sidr.js'
            ]
        }
    }
};
