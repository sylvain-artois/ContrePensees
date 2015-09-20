var fs = require('fs'),
    url = require('url'),
    path  = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    request = require('request'),
    tumblr = require('tumblr.js'),
    keystone = require('keystone'),
    cheerio = require('cheerio'),
    ent = require('ent'),
    async = require('async'),
    //process = require('process'),
    mongoose = require('/Users/sartois/Documents/PersonalWork/ContrePensees/node_modules/keystone/node_modules/mongoose/index');

var tumblrKey = "THLnV1lBF0gHjRMX2CdoYtftD0u1RQSlPiZ9gq7wn6J0qwW7PA",
    tumblrSiteUrl = 'd-pop-2-xport.tumblr.com',
    debugOutputfile = false,
    queryParams = {
        offset: 0,
        limit: 30,
        type:'photo'
    },
    client = tumblr.createClient({
        consumer_key: tumblrKey
    });

keystone.init({
    'name': 'Contre Pensées',
    'brand': 'Contre Pensées',
    'sass': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'html',
    'emails': 'templates/emails',
    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': '&C=:4,`XEOaLc9m]F{?q!$PR0F/5R[5%C%AaQe<TQ[[4E&d5E?Eo?%HN?DGiWOSa',
    'cloudinary config': 'cloudinary://533917263842595:pLS_Hi4hBqUcSqduiBekHJRTBEk@contre-pensees'
});
keystone.import('../models');

var Post = keystone.list('Post'),
    User = keystone.list('User'),
    Gallery = keystone.list('Gallery');

mongoose.connect('localhost', 'contre-pensees');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    async.waterfall([
        //Get author
        function(callback) {
            User.model.findOne()
                .where('email', 'sylvain.artois@gmail.com')
                .exec()
                .then(function (user) {
                    if (user === null) {
                        callback("User not found");
                    } else {
                        callback(null, user);
                    }
                }, callback);
        },
        //Launch Tumblr query
        function(user, callback) {

            client.posts(
                tumblrSiteUrl,
                queryParams,
                function(err, data) {
                    if (err || ! data) {
                        callback(err);
                    } else {
                        callback(null, data, user);
                    }
                }
            );
        },
        //Parse tumblr data
        handleTumblrApiResults

    ], function (err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(result);
        process.exit(0);
    });
});

/**
 * @param data
 * @param author
 */
function handleTumblrApiResults(data, author, callback) {

    data.posts.forEach(function(tpost) {

        if (tpost.state === 'published') {

            console.log(tpost.slug);

            var handlePostCallbackName = "handle" + capitalizeFirstLetter(tpost.type) + "Post";
            console.log(handlePostCallbackName);
            var post = thandler[handlePostCallbackName](tpost, author);

            if (post && "title" in post && post.title) {
                post.save(function(err) {
                    if (err) {
                        callback(err);
                    }
                });
            }
        }
    });

    //callback(null, "done");
}

var thandler = {
    /**
     * @param post
     * @param author
     */
    handlePhotoPost: function(post, author) {

        var slug = (post.slug) ? post.slug : post.id;

        mkdirp('/Users/sartois/Documents/PersonalWork/ContrePensees/misc/tumblr_data/photo/media/'+slug, function(err) {
            if (err) {
                console.error(err);
            } else {
                for (var i = 0 ; i < post.photos.length ; i++) {
                    var photo = post.photos[i];
                    var filename = '/Users/sartois/Documents/PersonalWork/ContrePensees/misc/tumblr_data/photo/media/' + slug + '/' + slug + "-" + i + ".jpg";
                    download(photo.original_size.url, filename, function(){
                        console.log('done', arguments)
                    });

                }
            }
        });

        /*post = new Gallery.model({

         publishedDate: moment.unix(tpost.timestamp),
         state: 'published',
         tags: tpost.tags,
         author: author

         });*/
    },
    /**
     * @param post
     * @param author
     * @returns Post
     */
    handleTextPost: function(post, author) {

        return new Post.model({
            publishedDate: moment.unix(tpost.timestamp),
            state: 'published',
            tags: tpost.tags,
            author: author,
            isQuote: false,
            title: tpost.title,
            content: {
                brief: "",
                extended: tpost.body.replace(/\\"/g, '"').replace(/\\'/g, "&apos;").replace(/\r?\n|\r/g, "")
            }
        });
    },
    /**
     * @param post
     * @param author
     * @returns {*}
     */
    handleQuotePost: function(post, author) {

        var quoteTitle = [];
        var uniciser = 1;
        var title = cleanQuoteTitle(tpost.source);

        if (! title) {
            return;
        }

        if (quoteTitle.indexOf(title) != -1) {
            title = title + " 0" + uniciser;
            uniciser++;
        }

        quoteTitle.push(title);

        outputfile(
            "misc/tumblr_data/quote/" + (tpost.slug) ? tpost.slug : tpost.id + ".json",
            tpost
        );

        return new Post.model({
            publishedDate: moment.unix(tpost.timestamp),
            state: 'published',
            tags: tpost.tags,
            author: author,
            isQuote: true,
            title: title,
            content: {
                brief: tpost.text,
                extended: tpost.source.replace(/\\"/g, '"').replace(/\\'/g, "&apos;").replace(/\r?\n|\r/g, "")
            }
        });
    }
};

/**
 * @param tpost
 */
function outputfile(outputFilename, content) {
    fs.writeFile(
        outputFilename,
        JSON.stringify(content, null, 4),
        function(err) {
            if (err) {
                console.log(err);
            }
        }
    );
}

/**
 * @param rawTitle
 */
function cleanQuoteTitle(rawTitle) {
    var title = "<section>" + ent.decode(decodeURIComponent(rawTitle.replace(/\\"/g, '"').replace(/\\'/g, "&apos;").replace(/\r?\n|\r/g, ""))) + "</section>";
    var $ = cheerio.load(title);
    return $("section").children().first().text();
}

/**
 *
 * @param uri
 * @param filename
 * @param callback
 */
function download(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

/**
 * http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
 *
 * @param string
 * @returns {string}
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
