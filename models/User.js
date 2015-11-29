var keystone = require('keystone'),
    Types    = keystone.Field.Types,
    User     = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    avatar: { type: Types.CloudinaryImage },
    bio: { type: Types.Html, wysiwyg: true, height: 200 },
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

User.relationship({ ref: 'Post',     path: 'author' });
User.relationship({ ref: 'Category', path: 'author' });

User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});

User.schema.virtual('url').get(function() {
    return '/' + this.name.full.split(' ').join('-').toLowerCase();
});

User.defaultColumns = 'name, avatar, email, isAdmin';
User.register();
