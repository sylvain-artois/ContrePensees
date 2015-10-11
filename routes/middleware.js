var _ = require('underscore');

/**
 * Initialises the standard view locals
 *
 * The included layout depends on the navLinks array to generate
 * the navigation in the header, you may wish to change this array
 * or replace it with your own templates / logic.
 *
 * @param req
 * @param res
 * @param next
 */
exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    locals.navLinks = [
        { label: 'Home',            key: 'home',        href: '/' },
        { label: 'Cogito',          key: 'cogito',      href: '/dye-pop' },
        { label: '&lt;code /&gt;',  key: 'code',        href: '/sylvain-artois/software' },
        { label: 'Portfolio',       key: 'portfolio',   href: '/portfolio/dye-pop' },
        { label: 'CV',              key: 'resume',      href: '/resume/sylvain-artois' },
        { label: 'Contact',         key: 'contact',     href: '/contact' }
    ];

    locals.user = req.user;

    next();
};

/**
 * Fetches and clears the flashMessages before a view is rendered
 *
 * @param req
 * @param res
 * @param next
 */
exports.flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

    next();
};

/**
 * Prevents people from accessing protected pages when they're not signed in
 *
 * @param req
 * @param res
 * @param next
 */
exports.requireUser = function(req, res, next) {

    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }
};

/**
 * Inits the error handler functions into `res`
 *
 * @param req
 * @param res
 * @param next
 */
exports.initErrorHandlers = function(req, res, next) {

    res.serverError = function(err, title, message) {
        var title = "Le serveur a planté",
            message = "";

        if (err instanceof Error) {
            message = err.message;
            err = err.stack;
        }
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    };

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    };

    next();
};
