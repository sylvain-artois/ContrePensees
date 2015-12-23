import $ from 'jquery';

/**
 * Class TopbarShrink
 */
export class TopbarShrink {

    /**
     * @param {object} options
     */
    constructor(options = {}) {

        this.$selector = $(options.el);
        this.$root = $(options.root);
        this.$doc = $(options.doc);

        this.shrinkClass = ("class" in options) ? options.class : "shrink";
        this.shrinkHeight = ("height" in options) ? options.height : 50;


        if (this.$selector.length === 0
            || this.$root.length === 0
            || this.$doc === 0) {
            throw new Error("TopbarShrink, missing required argument");
        }
    }

    /**
     * Add listener to the scroll event, and toggle the shrink class
     */
    shrink() {
        this.$root.scroll($.proxy(this.handleScoll, this));
    }

    handleScoll() {
        this.$selector.toggleClass(this.shrinkClass, (this.$doc.scrollTop() > this.shrinkHeight));
    }
}
