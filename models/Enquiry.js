var keystone = require('keystone');

var Types = keystone.Field.Types,
    Enquiry = new keystone.List('Enquiry', {
        nocreate: true,
        noedit: true,
        defaultSort: '-createdAt'
    });

Enquiry.add({
    name: { type: Types.Text },
    email: { type: Types.Email, required: true },
    message: { type: Types.Markdown, required: true },
    createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});

Enquiry.schema.post('save', function() {
    if (this.wasNew) {
        this.sendNotificationEmail();
    }
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {

    if ('function' !== typeof callback) {
        callback = function() {};
    }

    var enquiry = this;

    keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

        if (err) return callback(err);

        new keystone.Email('enquiry-notification').send({
            to: admins,
            from: {
                name: 'Contre Pensées',
                email: 'contact@contre-pensees.com'
            },
            subject: 'New Enquiry for Contre Pensées',
            enquiry: enquiry
        }, callback);
    });
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, message';
Enquiry.register();
