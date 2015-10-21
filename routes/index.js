var keystone   = require('keystone'),
    middleware = require('./middleware'),
    sitemap    = require('keystone-express-sitemap');

var importRoutes = keystone.importer(__dirname),
    // Import Route Controllers
    routes = {
        views: importRoutes('./views')
    };

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initCategories);
keystone.pre('routes', middleware.loadPinned);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});

// Setup Route Bindings
exports = module.exports = function(app) {

    app.get('/', routes.views.home);

    app.get('/search/:query?',  routes.views.search);

    app.get('/resume/sylvain-artois', routes.views.resume);
    app.get('/portfolio/dye-pop', routes.views.portfolio);

    app.all('/contact', routes.views.contact);

    app.get('/sitemap.xml', function(req, res) {
        sitemap.create(keystone, req, res);
    });

    app.get('/:author/:category?', routes.views.blog);
    app.get('/:author/:category?/:post', routes.views.post);

    //app.get('/sylvain-artois/software',  routes.views.code)
    //app.get('/sylvain-artois/software/:post', routes.views.post);

};
