var keystone = require('keystone');


function seachRelated(post, viewCallback)
{
    "use strict";

    var q = keystone.list('Post').model
        .find({
            $text : { $search : fullTextSearch } },{
            score : { $meta: "textScore" }
        })
        .sort({ score : { $meta : 'textScore' } })
        .populate('author categories')
        .limit(10);

    q.exec(function(err, documents) {
        if (err) {
            return next(err);
        }
        locals.data.posts = documents;
        next();
    });

}



exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'cogito';
    locals.filters = {
        post: req.params.post
    };
    locals.data = {
        posts: [],
        categories: [],
        env: keystone.get('env')
    };

    // Load the current post
    view.on('init', function(next) {

        var q = keystone.list('Post').model.findOne({
            state: 'published',
            slug: locals.filters.post
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.post = result;
            //fixme loop category to set the correct nav
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
