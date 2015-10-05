var keystone = require('keystone'),
    decode   = require('ent/decode');

exports = module.exports = function(req, res) {

    var view            = new keystone.View(req, res);
    var fullTextSearch  = decode(req.params.query);
    var locals          = res.locals;
    locals.section      = 'search';
    locals.data         = {
        posts: []
    };

    view.on('init', function(next) {

        var q = keystone.list('Post').model.find({
            $text : { $search : fullTextSearch } },{
            score : { $meta: "textScore" }
        }).sort({ score : { $meta : 'textScore' } }).populate('author categories').limit(10);

        q.exec(function(err, documents) {
            if (err) {
                return next(err);
            }
            locals.data.posts = documents;
            next();
        });
    });

    view.render('search');
};