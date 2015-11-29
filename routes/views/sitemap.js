var keystone = require('keystone'),
    commonlib = require('./../../models/lib/common'),
    moment = require('./../../node_modules/keystone/node_modules/moment'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);

    res.set('Content-Type', 'application/xml;charset=utf-8');
    res.locals.data = {
        baseUrl: commonlib.getSiteUrl(keystone.get('env')),
        generatedAt: moment().format(),
        cogitoCount: 0
    };

    //Load categories and count posts
    view.on('init', function (next) {

        keystone.list('Category').model.find()
            .sort('name')
            .exec(function (err, results) {
                if (err || !results.length) {
                    return next(err);
                }

                res.locals.data.categories = results;

                // Load the counts for each category
                async.each(res.locals.data.categories, function (category, next) {

                    keystone.list('Post').model.count()
                        .where('state', 'published')
                        .where('categories').in([category.id])
                        .exec(function (err, count) {
                            category.postCount = count;
                            next(err);
                        });
                }, function (err) {
                    next(err);
                });
        });

    });

    // Load posts
    view.on('init', function(next) {

        keystone.list('Post').model.find()
            .where('state', 'published')
            .populate('author categories')
            .sort('-updatedAt')
            .exec(function(err, documents) {
                if (err) {
                    return next(err);
                }
                res.locals.data.posts = documents;
                next();
            });
    });

    view.render('meta/sitemap');
};
