var fs = require('fs'),
    url = require('url'),
    path  = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    request = require('request'),
    tumblr = require('tumblr.js'),
    keystone = require('keystone');

var tumblrKey = "THLnV1lBF0gHjRMX2CdoYtftD0u1RQSlPiZ9gq7wn6J0qwW7PA",
    tumblrSiteUrl = 'd-pop-2-xport.tumblr.com',
    author = {},
    queryParams = {
        offset: 0,
        limit: 10
    },
    client = tumblr.createClient({
        consumer_key: tumblrKey
    }),
    Post = keystone.list('Post'),
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

        console.log(tpost);

        var post = {};

        if (tpost.state === 'published') {

            if (tpost.type==='photo') {
                return;
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
