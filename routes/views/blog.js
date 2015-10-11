var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'cogito';
    locals.filters = {
        category: req.params.category
    };
    locals.data = {
        posts: [],
        categories: [],
        env: keystone.get('env')
    };

    // Load all categories
    view.on('init', function(next) {

        keystone.list('Category').model.find().sort('name').exec(function(err, results) {

            if (err || !results.length) {
                return next(err);
            }

            locals.data.categories = results;
            next();
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

        var q = keystone.list('Post').paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10
            })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author categories');

        if (locals.data.category) {
            q.where('categories').in([locals.data.category]);
        }

        q.exec(function(err, results) {
            locals.data.posts = results;
            next(err);
        });
    });

    // Render the view
    view.render('blog');
};
