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
        categories: res.locals.categories,
        env: keystone.get('env')
    };

    // Load the current category filter
    view.on('init', function(next) {

        if (req.params.category) {
            keystone.list('Category')
                .model
                .findOne({ key: locals.filters.category })
                .exec(function(err, result) {
                    if (err) {
                        return next(err);
                    }
                    locals.data.category = result;
                    next();
                });
        } else {
            next();
        }
    });

    // Load the posts
    view.on('init', function(next) {

        var pageIndex = req.query.page || 1,
            perPage = 10,
            q = keystone.list('Post')
                .paginate({
                    page: pageIndex,
                    perPage: perPage,
                    maxPages: 10
                })
                .where('state', 'published')
                .where('isSoftwareRelated', false)
                .populate('author categories')
                .sort('-publishedDate');

        if (locals.data.category) {
            q.where('categories').in([locals.data.category]);
        }

        q.exec(function(err, documents) {
            if (err) {
                return next(err);
            }
            locals.data.posts = documents;
            next();
        });
    });

    // Render the view
    view.render('blog');
};
