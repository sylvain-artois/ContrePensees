var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'contact';
    locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.enquirySubmitted = false;
    locals.data = {
        categories: [],
        env: keystone.get('env')
    };

    // Load all categories
    view.on('init', function(next) {
        keystone.list('Category').model.find().sort('name').exec(function(err, results) {
            if (err || !results.length) {
                return next(err);
            }
            locals.data.categories = results;
            next();
        });
    });

    // On POST requests, add the Enquiry item to the database
    view.on('post', { action: 'contact' }, function(next) {

        var newEnquiry = new Enquiry.model(),
            updater = newEnquiry.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'name, email, phone, enquiryType, message',
            errorMessage: 'There was a problem submitting your enquiry:'
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.enquirySubmitted = true;
            }
            next();
        });

    });

    view.render('contact');
};
