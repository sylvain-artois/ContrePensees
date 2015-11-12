var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.filters = {
        post: req.params.post
    };
    locals.data = {
        categories: res.locals.categories,
        env: keystone.get('env'),
        isBlogType: true
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
                                .sort('-publishedDate')
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
                                    relatedPosts.shift();
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
