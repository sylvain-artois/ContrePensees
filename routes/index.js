var keystone   = require('keystone'),
    middleware = require('./middleware'),
    sitemap    = require('keystone-express-sitemap');

var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

    app.get('/', routes.views.home);
    app.get('/dye-pop/:category?', routes.views.blog);
    app.get('/dye-pop/post/:post', routes.views.post);

    app.get('/sylvain-artois/software',  routes.views.code)
    app.get('/sylvain-artois/software/:post', routes.views.post);

    app.get('/search/:query?',  routes.views.search);

    app.get('/resume/sylvain-artois', routes.views.resume);
    app.get('/portfolio/dye-pop', routes.views.portfolio);

    app.all('/contact', routes.views.contact);

    app.get('/sitemap.xml', function(req, res) {
        sitemap.create(keystone, req, res);
    });
};
