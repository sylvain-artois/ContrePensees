var keystone = require('keystone');

exports = module.exports = function(req, res) {

    if (['dye-pop', 'sylvain-artois'].indexOf(req.params.user) === -1) {
        return res.status(404).render('errors/404');
    }

    res.locals.section = (req.params.author === 'sylvain-artois') ?  'resume' : 'portfolio';
    res.locals.data = {
        categories: res.locals.categories,
        env: keystone.get('env'),
        isBlogType: false
    };

    new keystone.View(req, res).render(res.locals.section);
};
