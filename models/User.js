var keystone = require('keystone');

var Types = keystone.Field.Types,
    User = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    avatar: { type: Types.CloudinaryImage },
    bio: { type: Types.Html, wysiwyg: true, height: 200 },
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});

User.relationship({ ref: 'Gallery', path: 'author' });
User.relationship({ ref: 'Medium',  path: 'author' });
User.relationship({ ref: 'Photo',   path: 'author' });
User.relationship({ ref: 'Post',    path: 'author' });
User.relationship({ ref: 'Quote',   path: 'author' });

User.defaultColumns = 'name, avatar, email, isAdmin';

User.register();
