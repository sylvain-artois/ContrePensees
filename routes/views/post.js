var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    if (res.locals.categoriesKey.indexOf(req.params.category) === -1 ||
        ['dye-pop', 'sylvain-artois'].indexOf(req.params.user) === -1) {

        return res.status(404).render('errors/404');
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.filters = {
        post: req.params.post
    };
    locals.data = {
        categories: res.locals.categories,
        env: keystone.get('env'),
        isBlogType: true,
        fbId: process.env.FACEBOOK_ID
    };

    // Load the current post
    view.on('init', function(next) {

        keystone.list('Post').model
            .findOne({
                state: 'published',
                slug: locals.filters.post
            })
            .populate('author categories')
            .exec(function(mainPostErr, mainPost) {

                if (mainPostErr) {
                    return next(mainPostErr);
                }

                if (! "key" in mainPost) {
                    return next(new Error("Post not found"));
                }

                locals.data.mainPost = mainPost;
                locals.data.mainPost.share = {
                    tumblr: mainPost.share('tumblr'),
                    facebook: mainPost.facebookShareUrl(process.env.FACEBOOK_ID),
                    pinterest: mainPost.share('pinterest'),
                    twitter:  mainPost.share('twitter'),
                };

                locals.section = (mainPost.isSoftwareRelated) ? 'code' : 'cogito';

                async.parallel(
                    [
                        //Get previous post
                        function(callback){
                            "use strict";

                            keystone.list('Post').model
                                .findOne({
                                    state: 'published',
                                    publishedDate: { $lt: mainPost.publishedDate }
                                })
                                .sort('-publishedDate')
                                .populate('author categories')
                                .exec(function(previousPostErr, previousPost) {
                                    if (previousPostErr) {
                                        return callback(previousPostErr);
                                    }
                                    callback(null, previousPost);
                                });
                        },
                        //Get next post
                        function(callback){
                            "use strict";

                            keystone.list('Post').model
                                .findOne({
                                    state: 'published',
                                    publishedDate: { $gt: mainPost.publishedDate }
                                })
                                .sort('publishedDate')
                                .populate('author categories')
                                .exec(function(nextPostErr, nextPost) {
                                    if (nextPostErr) {
                                        return callback(nextPostErr);
                                    }
                                    callback(null, nextPost);
                                });
                        },
                        //Get related post
                        function(callback){
                            "use strict";

                            keystone.list('Post').model
                                .find(
                                    { $text : { $search : mainPost.searchRelated } },
                                    { score : { $meta : "textScore" } }
                                )
                                .sort({ score : { $meta : 'textScore' } })
                                .populate('author categories')
                                .limit(5)
                                .exec(function(relatedPostErr, relatedPosts) {

                                    if (relatedPostErr) {
                                        return callback(relatedPostErr);
                                    }

                                    //The first el is often the same as searched
                                    var firstRelated = relatedPosts.shift();

                                    //Too much result
                                    if (relatedPosts.length > 3) {
                                        relatedPosts = relatedPosts.slice(0, 3);
                                    } else if (relatedPosts.length <= 2) {
                                        relatedPosts.push(firstRelated);
                                    }

                                    callback(null, relatedPosts);
                                });
                        },
                    ],
                    function(parallelError, results) {

                        if (parallelError) {
                            return next(parallelError);
                        }

                        locals.data.previousPost = results[0];
                        locals.data.nextPost     = results[1];
                        locals.data.relatedposts = results[2];
                        next();
                    }
                );
            });
    });

    view.render('post');
};
