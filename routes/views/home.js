var keystone = require('keystone');

exports = module.exports = function(req, res) {

    res.locals.section = 'home';
    res.locals.data = {
        categories: res.locals.categories,
        env: keystone.get('env')
    };

    new keystone.View(req, res).render('home');
};
