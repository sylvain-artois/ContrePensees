var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.filters = {
        user: req.params.user,
        category: req.params.category
    };

    locals.data = {
        posts: [],
        categories: res.locals.categories,
        env: keystone.get('env')
    };

    var categoryFilter = res.locals.categories.filter(function(category) {
        return category.name === locals.filters.category
    });

    if (categoryFilter.length <= 1) {
        return res.status(404).render('errors/404');
    }

    // Load the current category filter
    view.on('init', function(next) {

        console.log(locals.filters.category);

        keystone.list('Category')
            .model
            .findOne({ key: locals.filters.category })
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }
                locals.data.category = result;
                locals.section = result.name;
                next();
            });
    });

    // Load the posts
    view.on('init', function(next) {

        var pageIndex = req.query.page || 1,
            perPage = 10;

        keystone.list('Post')
            .paginate({
                page: pageIndex,
                perPage: perPage,
                maxPages: 10
            })
            .where('state', 'published')
            .where('categories').in([locals.data.category])
            .populate('author categories')
            .sort('-publishedDate')
            .exec(function(err, documents) {
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
