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
    mongoose = require('/Users/sartois/Documents/PersonalWork/ContrePensees/node_modules/keystone/node_modules/mongoose/index');

var tumblrKey = "THLnV1lBF0gHjRMX2CdoYtftD0u1RQSlPiZ9gq7wn6J0qwW7PA",
    tumblrSiteUrl = 'd-pop-2-xport.tumblr.com',
    debugOutputfile = false,
    author = {},
    queryParams = {
        offset: 0,
        limit: 50,
        type:'video'
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
mongoose.connection.on('open', function() {

    //Fetch the blog main author
    User.model.find()
        .where('email', 'sylvain.artois@gmail.com')
        .exec()
        .then(function (users) {

            author = users[0];

            //Query tumblr
            client.posts(
                tumblrSiteUrl,
                queryParams,
                handleTumblrApiResults
            );

        }, function (err) {
            //console.error(err);
        });
});

/**
 * @param err
 * @param data
 *
 * @global author
 */
function handleTumblrApiResults(err, data) {

    if (err || ! data) {
        console.error(err, data);
        return;
    }

    var quoteTitle = [];
    var uniciser = 1;

    outputfile("misc/tumblr_data/dumpVideo."+data.posts.length+".json", data);

    return;

    data.posts.forEach(function(tpost) {

        console.log(tpost.slug);

        var post = {};

        if (tpost.state === 'published') {

            if (tpost.type === 'photo') {

                outputfile(
                    "misc/tumblr_data/photo/" + (tpost.slug) ? tpost.slug : tpost.id + ".json",
                    tpost
                );

                /*post = new Gallery.model({

                 publishedDate: moment.unix(tpost.timestamp),
                 state: 'published',
                 tags: tpost.tags,
                 author: author

                 });*/

            } else if (tpost.type === 'text') {

                post = new Post.model({
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

            } else if (tpost.type === 'quote') {

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

                post = new Post.model({
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

            if ("title" in post && post.title) {
                post.save(function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }

        /* content: {
            brief: { type: Types.Html, wysiwyg: true, height: 150 },
            extended: { type: Types.Html, wysiwyg: true, height: 400 }
        } */
    });

    return;
}

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
 * @param tpost
 */
function cleanQuoteTitle(rawTitle) {
    var title = "<section>" + ent.decode(decodeURIComponent(rawTitle.replace(/\\"/g, '"').replace(/\\'/g, "&apos;").replace(/\r?\n|\r/g, ""))) + "</section>";
    var $ = cheerio.load(title);
    return $("section").children().first().text();
}

