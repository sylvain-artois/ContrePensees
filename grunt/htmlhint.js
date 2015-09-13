module.exports = {
    build: {
        options: {
            'tag-pair': true,
            // Force tags to have a closing pair
            'tagname-lowercase': false,
            // Force tags to be lowercase
            'attr-lowercase': false,
            // Force attribute names to be lowercase e.g. <div id="header"> is invalid
            'attr-value-double-quotes': false,
            // Force attributes to have double quotes rather than single
            'doctype-first': true,
            // Force the DOCTYPE declaration to come first in the document
            'spec-char-escape': true,
            // Force special characters to be escaped
            'id-unique': false,
            // Prevent using the same ID multiple times in a document
            'head-script-disabled': false,
            // Prevent script tags being loaded in the  for performance reasons
            'style-disabled': true
            // Prevent style tags. CSS should be loaded through
        },
        src: ['app/*.html']
    }
}