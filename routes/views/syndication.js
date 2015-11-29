var keystone = require('keystone'),
    Feed = require('feed'),
    ent = require('ent'),
    moment = require('./../../node_modules/keystone/node_modules/moment'),
    commonlib = require('./../../models/lib/common'),
    async = require('async');

exports = module.exports = function(req, res) {

    async.parallel(
        [
            //Load the main author
            function(callback) {
                keystone.list('User').model
                    .findOne({
                        email: 'sylvain.artois@contrepensees.fr'
                    })
                    .exec(function(authorErr, author) {
                        if (authorErr) {
                            return callback(authorErr);
                        }
                        callback(null, author);
                    });
            },
            //Load last 20 updated post
            function(callback){
                keystone.list('Post')
                    .paginate({
                        page: 1,
                        perPage: 20,
                        maxPages: 10
                    })
                    .where('state', 'published')
                    .populate('author categories')
                    .sort('-updatedAt')
                    .exec(function(postErr, posts) {
                        if (postErr) {
                            return callback(postErr);
                        }
                        callback(null, posts);
                    });
            }
        ],
        //Create the feed
        function(parallelError, results) {

            if (parallelError) {
                return next(parallelError);
            }

            var author = results[0],
                posts  = results[1],
                feed = new Feed({
                    title: 'contrepensees.fr, flux rss',
                    description: 'Les 20 derniers articles mis à jour sur contrepensees.fr',
                    link: commonlib.getSiteUrl(keystone.get('env')),
                    image: commonlib.getSiteUrl(keystone.get('env')) + "/logo.png",
                    copyright: 'Copyright © [YEAR] [NAME]. All rights reserved'.replace('[YEAR]', moment().format('YYYY')).replace('[NAME]', author.full),
                    author: {
                        name: author.full,
                        email: author.email,
                        link: commonlib.getSiteUrl(keystone.get('env')) + author.url
                    }
                });

            res.locals.categories.forEach(function(category){
                feed.addCategory(category.name);
            });

            if ('results' in posts && Array.isArray(posts.results)) {
                posts.results.forEach(function(post){
                    feed.addItem({
                        title:         post.pageTitle,
                        link:          post.fullUrl,
                        description:   post.desc,
                        date:          post.updatedAt
                    });
                });
            }

            // Setting the appropriate Content-Type
            res.set('Content-Type', 'text/xml');

            // Sending the feed as a response
            res.send(feed.render('atom-1.0'));
        }
    );
};
