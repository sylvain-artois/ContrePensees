var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'blog';
    locals.filters = {
        post: req.params.post
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
            next();
        });
    });

    // Load the current post
    view.on('init', function(next) {

        var q = keystone.list('Post').model.findOne({
            state: 'published',
            slug: locals.filters.post
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.post = result;
            next(err);
        });
    });

    // Load other posts
    view.on('init', function(next) {

        var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        q.exec(function(err, results) {
            locals.data.posts = results;
            next(err);
        });
    });

    view.render('post');
};
