var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'home';
    locals.data = {
        lastposts: []
    };

    view.on('init', function(next) {

        keystone.list('Post').model.find()
            .where('state', 'published')
            .sort({ 'publishedDate': 'desc'})
            .limit(3)
            .populate('author')
            .populate('categories')
            .exec(function(err, results) {
                locals.data.lastposts = results;
                next(err);
            });
    });

    // Render the view
    view.render('home');
};
