var fs = require('fs'),
    url = require('url'),
    path  = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    request = require('request'),
    tumblr = require('tumblr.js'),
    keystone = require('keystone'),
    fs = require('fs'),
    mongoose = require('/Users/sartois/Documents/PersonalWork/ContrePensees/node_modules/keystone/node_modules/mongoose/index');

var tumblrKey = "THLnV1lBF0gHjRMX2CdoYtftD0u1RQSlPiZ9gq7wn6J0qwW7PA",
    tumblrSiteUrl = 'd-pop-2-xport.tumblr.com',
    author = {},
    queryParams = {
        offset: 0,
        limit: 10,
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

mongoose.connect('localhost', 'contre-pensees');

mongoose.connection.on('open', function() {

    var Post = keystone.list('Post'),
        User = keystone.list('User'),
        Gallery = keystone.list('Gallery');

    //Fetch the blog main author
    User.model.find()
        .where('id', '55f0999415c8ec770865fc2f')
        .limit(1)
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
            throw err;
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



    data.posts.forEach(function(tpost) {

        console.log(tpost.slug);

        var post = {};

        if (tpost.state === 'published') {

            if (tpost.type==='photo') {

                var outputFilename=tpost.slug+".json";

                fs.writeFile(
                    outputFilename,
                    JSON.stringify(tpost, null, 4),
                    function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("JSON saved to " + outputFilename);
                        }
                    }
                );

                /*post = new Gallery.model({

                    publishedDate: moment.unix(tpost.timestamp),
                    state: 'published',
                    tags: tpost.tags,
                    author: author

                });*/

            } else if (tpost.type==='text' || tpost.type==='quote') {

                var isQuote = tpost.type==='quote';

                post = new Post.model({

                    publishedDate: moment.unix(tpost.timestamp),
                    state: 'published',
                    tags: tpost.tags,
                    author: author,

                    isQuote: isQuote,
                    title: isQuote ? tpost.source : tpost.title,
                    extended: isQuote ? tpost.text : tpost.body
                });
            }
        }

        /* content: {
            brief: { type: Types.Html, wysiwyg: true, height: 150 },
            extended: { type: Types.Html, wysiwyg: true, height: 400 }
        } */
    });
}

