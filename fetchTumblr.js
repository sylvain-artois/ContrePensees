var fs = require('fs'),
    url = require('url'),
    path  = require('path'),
    mkdirp = require('mkdirp'),
    moment = require('moment'),
    request = require('request'),
    tumblr = require('tumblr.js'),
    tumblrKey = "XXX",
    apiEndpoint = "api.tumblr.com/v2/blog/d-pop-2-xport/posts?api_key="+tumblrKey,
    tumblrSite = 'd-pop-2-xport.tumblr.com',
    pos = 0,
    step = 1,
    total = 0,
    client = tumblr.createClient({
        consumer_key: tumblrKey
    });

do {
    client.posts(
        tumblrSite,
        {
            offset: pos,
            limit: step
        },
        function(err, data) {

            if (err || ! data) {
                console.log(err, data);
                return;
            }

            if (data.total_posts > total) {
                //set total count, should only happen the first time
                total = data.total_posts;
            }

            data.posts.forEach(function(tpost) {

                console.log(tpost);
                tpost.slug
                tpost.type
                tpost.state == 'published'
                tpost.tags
                moment.unix(tpost.timestamp);
            });
        }
    );

} while (pos < total);
