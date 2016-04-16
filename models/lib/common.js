/**
 * A simple module to share function between model document
 */
//models/lib/common.js

var truncate = require('html-truncate'),
    ent = require('ent'),
    removeTagsRegex = /(<([^>]+)>)/ig,
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
    ],
    postTypeToTumblr = {
        'text':'text',
        'quote':'quote',
        'photo':'photo',
        'gallery':'photo',
        'medium':'text'
    };


module.exports = {
    /**
     * Simple html tag remove regex
     * @returns {RegExp}
     */
    removeTagsRegex: function() {
        return removeTagsRegex;
    },
    /**
     * @param env
     * @returns {string}
     */
    getSiteUrl: function(env) {
        return (env === 'production') ? 'http://dye-pop.com' : 'http://localhost:3001';
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
     * @param post
     * @returns {string}
     */
    pageTitle: function(post) {
        var fullTitle = "Post";

        if (typeof post.title === 'string') {
            fullTitle = post.title;
        }

        if (post.type === 'quote') {
            fullTitle = 'Citation';
        } else if (post.type === 'photo' || post.type === 'gallery') {
            fullTitle = 'Photographie';
        }

        return fullTitle;
    },
    /**
     * @param post
     * @param field
     * @param length
     * @returns {*}
     */
    brief: function(post, field, length) {
        return truncate(
            ent.decode(post[field]),
            length, {
                ellipsis: '<a href="' + post.url + '" style="margin-top:0">&nbsp;...</a>'
            }
        );
    },
    /**
     * @param post
     * @returns {string}
     */
    postUrl: function(post) {
        var urlParts = [];

        if (Array.isArray(post.categories) && post.categories.length > 0) {
            urlParts.push(post.categories[0].key);
        } else { //default category ?
            urlParts.push('inspiration');
        }

        urlParts.push(post.author.url.substr(1));
        urlParts.push(post.slug);

        return '/' + urlParts.join('/');
    },
    /**
     * @param post
     * @returns {*|string}
     */
    searchRelated: function(post) {

        var searchString = post.tagsArray;

        if (typeof post.title === "string") {
            searchString = searchString.concat(post.title.split(' '));
        }

        if (typeof post.writer === "string") {
            searchString = searchString.concat(post.writer.split(' '));
        }

        return this.handleKeyWords(searchString);
    },

    /**
     * Split 2 words tag
     * One line lowercase, remove coma
     * Remove french stop words
     * Remove duplicate with Array.filter
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
        toReturn = toReturn.join('~').toLowerCase().replace(/,/g, '').split('~');
        toReturn = this.removeStopWords(toReturn);
        toReturn = toReturn.filter(function(value, index, self) {
                return value.length > 1 && self.indexOf(value) == index;
            }
        );

        return toReturn.join(' ');
    },

    /**
     * @param tokens
     * @returns {*}
     */
    removeStopWords: function(tokens) {
        return tokens.filter(function(i) {
                return frenchStopWords.indexOf(i) === -1;
            }
        );
    },
    /**
     * @param post
     * @returns {*}
     */
    desc: function(post, split) {
        var field = 'caption',
            desc = '';

        if (post.type === 'text') {
            field = 'brief';
        } else if (post.type === 'quote') {
            field = 'quote';
        }

        desc = ent.decode(post[field].replace(removeTagsRegex, ""));

        if (split !== undefined) {
            desc.slice(0, split);
        }

        return desc;
    },

    /**
     * @param post
     * @returns {string}
     */
    shareOnTumblr: function(post) {

        var baseUrl = 'https://www.tumblr.com/widgets/share/tool?',
            queryParams = {
                'posttype': postTypeToTumblr[post.type],
                'tags': post.tags,
                'canonicalUrl': this.getSiteUrl('production') + post.url
            };

        if (post.type === 'text') {
            queryParams.title = post.title;
            queryParams.content = post.brief;
        } else if (post.type === 'quote') {
            queryParams.content = post.quote;
            queryParams.caption = post.writer;
        } else if (post.type === 'photo') {
            queryParams.content = post.image.url;
            queryParams.caption = post.caption;
        } else if (post.type === 'gallery') {
            var gals = [];
            post.images.forEach(function(el){
                gals.push(el.url);
            });
            queryParams.content = gals.join(',');
            queryParams.caption = post.caption;
        } else {
            queryParams.content = post.caption;
        }

        for (var key in queryParams) {
            baseUrl += key + '=' + encodeURIComponent(queryParams[key]) + '&';
        }

        //remove last &
        return baseUrl.slice(0, -1);
    },
    /**
     * @param post
     * @returns {*}
     */
    shareOnPinterest: function(post) {
        var pinUrl = "https://www.pinterest.com/pin/create/button/?url=[URL]&description=[DESC]"
            .replace('[URL]', encodeURIComponent(this.getSiteUrl('production')))
            .replace('[DESC]', encodeURIComponent(post.desc))

        if (post.image.exists || post.type === "gallery") {
            return pinUrl + '&media=' + (post.image.exists ? post.image.url : post.images[0].url);
        }

        return false;
    },
    /**
     * @param post
     */
    shareOnTwitter: function(post) {
        return 'https://twitter.com/intent/tweet?text=[text]&url=[url]&hashtags=[tags]&via=dye_pop'
            .replace('[text]', encodeURIComponent(this.desc(post, 100)))
            .replace('[url]', encodeURIComponent(this.getSiteUrl('production') + post.url) )
            .replace('[tags]', encodeURIComponent(post.tagsArray.join('~').split(' ').join('').split('~').join(',')));
    },
    /**
     * @param categories
     * @returns {Array}
     */
    getCategoriesKey: function(categories) {
        var categoriesKey = [];
        categories.forEach(function(el){
            categoriesKey.push(el.key);
        });
        categoriesKey.push('cogito');
        return categoriesKey;
    }
};