var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'blog';
    locals.filters = {
        category: req.params.category
    };
    locals.data = {
        posts: [],
        categories: []
    };

    // Load all categories
    view.on('init', function(next) {

        keystone.list('Category').model.find().sort('name').exec(function(err, results) {

            if (err || !results.length) {
                return next(err);
            }

            locals.data.categories = results;

            // Load the counts for each category
            async.each(locals.data.categories, function(category, next) {

                keystone.list('Post').model.count().where('category').in([category.id]).exec(function(err, count) {
                    category.postCount = count;
                    next(err);
                });

            }, function(err) {
                next(err);
            });
        });
    });

    // Load the current category filter
    view.on('init', function(next) {

        if (req.params.category) {
            keystone.list('Category').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
                locals.data.category = result;
                next(err);
            });
        } else {
            next();
        }
    });

    // Load the posts
    view.on('init', function(next) {

        var q1 = keystone.list('Post').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author category');

        if (locals.data.category) {
            q1.where('category').in([locals.data.category]);
        }

        var q2 = keystone.list('Quote').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author category');

        if (locals.data.category) {
            q2.where('category').in([locals.data.category]);
        }

        var q3 = keystone.list('Photo').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author category');

        if (locals.data.category) {
            q3.where('category').in([locals.data.category]);
        }

        var q4 = keystone.list('Photo').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author category');

        if (locals.data.category) {
            q4.where('category').in([locals.data.category]);
        }

        async.parallel([
            function(callback){
                q1.exec(function(err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, results);
                    }
                });
            },
            function(callback){
                q2.exec(function(err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, results);
                    }
                });
            },
            function(callback){
                q3.exec(function(err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, results);
                    }
                });
            },
            function(callback){
                q4.exec(function(err, results) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, results);
                    }
                });
            }
        ], function(err, results){
            if (err) {
                next(err);
            } else {
                console.log( results[0].results.length + results[1].results.length + results[2].results.length + results[3].results.length);
                var mixedPost = results[0].results.concat(results[1].results, results[2].results, results[3].results);
                console.log(mixedPost.length);
                mixedPost = mixedPost.sort(function(a, b) {
                    var x = a['publishedDate'],
                        y = b['publishedDate'];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
                console.log(mixedPost.length);
                results.results = mixedPost.slice(0, 10);
                console.log(results.results.length);

                locals.data.posts = results;
                next(null);
            }
        });
    });

    // Render the view
    view.render('blog');
};
