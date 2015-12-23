var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals,
        dyePopCategoryKey = ['edito', 'extraits', 'mon-oeil'];

    locals.section = 'home';
    locals.data = {
        categories: locals.categories,
        env: keystone.get('env'),
        postByCategory: []
    };

    // Load last three updated post for each category
    view.on('init', function(next) {
        async.each(locals.data.categories, function(category, callback) {

            //If we are in posts list not written by me, select more post so that we can filter
            var limit = (dyePopCategoryKey.indexOf(category.key) === -1) ? 10 : 3;

            keystone.list('Post').model.find()
                .where('state', 'published')
                .where('categories').in([category])
                .populate('author categories')
                .sort('-publishedDate')
                .limit(limit)
                .exec(function(err, documents) {
                    if (err) {
                        return callback(err);
                    }

                    //Not written by me category
                    if (dyePopCategoryKey.indexOf(category.key) === -1) {

                        //Remove posts with double category, with one category "written by me"
                        documents = documents.filter(function(post) {
                            var keepPost = true;
                            post.categories.every(function(postCategory) {
                                if (dyePopCategoryKey.indexOf(postCategory.key) !== -1) {
                                    return keepPost = false;
                                }
                                return true;
                            });
                            return keepPost;
                        });
                        documents = documents.slice(0, 3);
                    }

                    category.posts = documents;
                    locals.data.postByCategory[parseInt(category.rank) - 1] = category;
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
