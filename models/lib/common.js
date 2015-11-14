/**
 * A simple module to share function between model document
 */
//models/lib/common.js

var removeTagsRegex = /(<([^>]+)>)/ig,
    defaultRandPhotoPath =  "/images/frontSlider/2015-07-20-[ID].jpg",
    frenchStopWords = ['alors','au','aucuns','aussi','autre','avant',
        'avec','avoir','bon','car','ce','cela','ces','ceux','chaque','ci',
        'comme','comment','dans','des','du', 'de', 'dedans','dehors','depuis',
        'devrait','doit','donc','dos','début','elle','elles','en','encore',
        'essai','est','et','eu','fait','faites','fois','font','hors','ici',
        'il','ils','je','la','le','les','leur','là','ma','maintenant','mais','mes',
        'mon','même','ni','nommés','notre','nous','ou','où','par','parce',
        'pas','peut','peu','plupart','pour','quand','que','quel','quelle','quelles',
        'quels','qui','sa','sans','ses','seulement','si','sien','son','sont','sous',
        'soyez','sur','ta','tandis','tellement','tels','tes','ton','tous','tout','trop',
        'très','tu','voient','vont','votre','vous','vu','ça','étaient','état','étions','été','être'
    ];


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
     * Remove french stop words
     * One line lowercase, remove coma
     * Remove duplicate with Array.reduce
     * Return word space separated
     *
     * @param tokens
     * @returns {string}
     */
    handleKeyWords: function(tokens) {

        var toReturn = [];
        tokens.forEach(function(value){
            value.split(' ').forEach(function(val){
                toReturn.push(val);
            });
        });
        console.log(toReturn);
        toReturn = toReturn.join('~').toLowerCase().replace(/,/g, '').split('~');
        console.log(toReturn);
        toReturn = this.removeStopWords(toReturn);
        console.log(toReturn);
        toReturn = toReturn.filter(function(value, index, self) {
                return value.length > 1 && self.indexOf(value) == index;
            }
        );
        console.log(toReturn);

        return toReturn.join(' ');
    },

    /**
     * @param tokens
     * @returns {*}
     */
    removeStopWords: function(tokens) {
        console.log('call');
        return tokens.filter(function(i) {
                return frenchStopWords.indexOf(i) === -1;
            }
        );
    }
};