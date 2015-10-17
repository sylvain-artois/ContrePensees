var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'code';
    locals.filters = {
        category: "Software"
    };
    locals.data = {
        posts: [],
        categories: res.locals.categories,
        category: {},
        env: keystone.get('env')
    };

    // Load the "Software" category
    view.on('init', function(next) {
        keystone.list('Category').model.findOne({ 'name': locals.filters.category }).exec(function(err, result) {
            locals.data.category = result;
            next(err);
        });
    });

    // Load post from "Software" category
    view.on('init', function(next) {

        var q = keystone.list('Post')
            .paginate({
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
    view.render('code');
};
