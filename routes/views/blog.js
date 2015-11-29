var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

    if (res.locals.categoriesKey.indexOf(req.params.category) === -1 ||
        ['dye-pop', 'sylvain-artois'].indexOf(req.params.user) === -1) {
        return res.status(404).render('errors/404');
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.filters = {
        user: req.params.user,
        category: req.params.category
    };

    if (locals.filters.category === 'cogito') {
        delete locals.filters.category;
    }

    locals.section = (locals.filters.category === 'software') ? 'code' : 'cogito';
    locals.data = {
        posts: [],
        categories: res.locals.categories,
        env: keystone.get('env')
    };

    // Load the current category filter
    view.on('init', function(next) {

        var category = req.params.category

        if (category && category != 'cogito') {
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
                .where('isSoftwareRelated', (locals.filters.category === 'software'))
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
