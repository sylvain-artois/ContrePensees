var keystone   = require('keystone'),
    middleware = require('./middleware');

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
    app.get('/sitemap.xml', routes.views.sitemap);
    app.get('/atom.xml', routes.views.syndication);
    app.all('/contact', routes.views.contact);
    app.get('/search/:query?',  routes.views.search);


    app.get('/:user/:category/:post', routes.views.post);
    app.get('/:user/:category', routes.views.blog);
    //Portfolio and CV
    app.get('/:user', routes.views.user);

};
