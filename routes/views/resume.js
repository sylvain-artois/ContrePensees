var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'resume';
    locals.data = {
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
            next(err);
        });
    });

    view.render('resume');
};