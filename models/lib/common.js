/**
 * A simple module to share function between model document
 */
//models/lib/common.js

var removeTagsRegex = /(<([^>]+)>)/ig,
    defaultRandPhotoPath =  "/images/frontSlider/2015-07-20-[ID].jpg";

module.exports = {
    /**
     * Simple html tag remove regex
     * @returns {RegExp}
     */
    removeTagsRegex: function() {
        return removeTagsRegex;
    },
    /**
     * Randomize arrays in JavaScript with the Fisher-Yates shuffle algorithm
     * http://sedition.com/perl/javascript-fy.html
     *
     * @param array
     * @returns Array
     */
    shuffle: function(array) {

        if (! Array.isArray(array)) {
            throw new Error("Bad function call, first shuffle arg must be an array");
        }

        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    /**
     * http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
     *
     * @param int rangeTo
     * @returns array
     */
    range: function(rangeTo) {
        return Array.apply(null, {length: rangeTo}).map(Number.call, Number)
    },
    /**
     * Return a full html path to a random image
     *
     * @returns {string}
     */
    randomPhoto: function() {
        var randomPhotoId = this.shuffle(this.range(6))[0] + 1;
        return defaultRandPhotoPath.replace("[ID]", randomPhotoId);
    },
    /**
     *
     * @param array1
     * @param array2
     * @returns {string}
     */
    handleKeyWords: function(array1, array2) {
        "use strict";

        var toReturn =[];
        toReturn = toReturn.concat(array1, array2);
        toReturn = toReturn.join('~').toLowerCase().replace(/,/g, '').split('~');
        toReturn = toReturn.filter(function(value, index, self) {
                return value.length > 1 && self.indexOf(value) == index;
            }
        );

        return toReturn.join(' ');
    }
};