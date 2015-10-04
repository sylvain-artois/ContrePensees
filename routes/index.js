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
    app.get('/blog/:category?', routes.views.blog);
    app.get('/blog/post/:post', routes.views.post);
    app.get('/sylvain-artois/resume', routes.views.resume);
    app.get('/dye-pop/portfolio', routes.views.portfolio);
    app.all('/contact', routes.views.contact);
    app.all('/search/:query?',  routes.views.search);

    app.get('/sitemap.xml', function(req, res) {
        sitemap.create(keystone, req, res);
    });
};
