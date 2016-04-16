require('dotenv').load();

var keystone = require('keystone'),
    fileStreamRotator = require('file-stream-rotator'),
    fs = require('fs'),
    commonlib = require('./models/lib/common'),
    swig = require('swig');

swig.setFilter('truncate', function (input, truncateAt) {
    if (typeof input === 'string') {
        return input.substring(0, truncateAt);
    }
    return input;
});

keystone.init({
    'port': 3001,
    'name': 'Contre Pensées',
    'brand': 'Contre Pensées',
    'static': 'public',
    'views': 'templates/views',
    'view engine': 'html',
    'custom engine': swig.renderFile,
    'emails': 'templates/emails',
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': process.env.COOKIE_SECRET,
    'compress': true,
    'logger': '[:date[clf]] :method :url :status :response-time ms - :remote-addr - :referrer - :user-agent',
    'logger options': {
        stream: getLogStream(__dirname + '/logs')
    },
    'session store':'mongo',
    'wysiwyg images': true,
    'wysiwyg cloudinary images': true,
    'wysiwyg menubar': true,
    'wysiwyg skin': 'lightgray',
    'wysiwyg additional buttons': 'emoticons searchreplace charmap',
    'wysiwyg additional plugins': 'emoticons searchreplace charmap'
});

keystone.import('models');

keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
    'administration':['enquiries', 'users'],
    'category': 'categories',
    'post': 'posts'
});

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
    replace: commonlib.getSiteUrl(keystone.get('env')) + '/images/'
}, {
    find: '/keystone/',
    replace: commonlib.getSiteUrl(keystone.get('env')) + '/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

keystone.start();

/**
 * @param {string} logDirectory Root log directory
 * @return {WriteStream}
 */
function getLogStream(logDirectory) {

    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    return fileStreamRotator.getStream({
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        date_format: "YYYY-MM-DD",
        verbose: false
    });
}
