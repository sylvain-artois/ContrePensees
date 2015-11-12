var keystone = require('keystone'),
    decode   = require('ent/decode');

exports = module.exports = function(req, res) {

    var fullTextSearch  = decode(req.params.query);
    var locals          = res.locals;
    locals.section      = 'search';
    locals.data         = {
        posts: [],
        categories: res.locals.categories,
        env: keystone.get('env'),
        isBlogType: true
    };

    new keystone.View(req, res)
        .on('init', function(next) {
            keystone.list('Post').model
                .find(
                    { $text : { $search : fullTextSearch } },
                    { score : { $meta : "textScore" } }
                )
                .sort({ score : { $meta : 'textScore' } })
                .populate('author categories')
                .limit(10)
                .exec(function(err, documents) {
                    if (err) {
                        return next(err);
                    }
                    locals.data.posts = documents;
                    next();
                });
        })
        .render('search');
};