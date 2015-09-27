require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');

keystone.init({
    'name': 'Contre Pensées',
    'brand': 'Contre Pensées',
    'static': 'public',
    'views': 'templates/views',
    'view engine': 'html',
    'custom engine': cons.nunjucks,
    'emails': 'templates/emails',
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': process.env.COOKIE_SECRET,
    'compress':true,
    'logger': ":method :url :status :response-time ms",
    //logger options:
    'session store':'mongo',
    'wysiwyg images': true,
    'wysiwyg cloudinary images': true,
    'wysiwyg menubar': true
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
    logo_src: '/images/logo-email.gif',
    logo_width: 194,
    logo_height: 76,
    theme: {
        email_bg: '#f9f9f9',
        link_color: '#2697de',
        buttons: {
            color: '#fff',
            background_color: '#2697de',
            border_color: '#1a7cb7'
        }
    }
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
    find: '/images/',
    replace: (keystone.get('env') == 'production') ? 'http://contrepensees.fr/images/' : 'http://localhost:3000/images/'
}, {
    find: '/keystone/',
    replace: (keystone.get('env') == 'production') ? 'http://contrepensees.fr/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
    'administration':['enquiries', 'users'],
    'category': 'categories',
    'post': 'posts'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
