var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'home';
    locals.data = {
        categories: locals.categories,
        env: keystone.get('env'),
        postByCategory: {}
    };

    // Load last three updated post for each category
    view.on('init', function(next) {
        async.each(locals.data.categories, function(category, callback) {

            keystone.list('Post').model.find()
                .where('state', 'published')
                .where('categories').in([category])
                .populate('author categories')
                .sort('-publishedDate')
                .limit(3)
                .exec(function(err, documents) {
                    if (err) {
                        return callback(err);
                    }

                    category.posts = documents;
                    locals.data.postByCategory[category.key] = category
                    callback();
                });
        }, function(err) {
            if  (err) {
                return next(err);
            }
            next();
        });
    });

    view.render('home');
};
