var keystone = require('keystone');

var Category = new keystone.List('Category', {
    autokey: { from: 'name', path: 'key', unique: true }
});

Category.add({
    name: { type: String, required: true }
});

Category.relationship({ ref: 'Gallery', path: 'category' });
Category.relationship({ ref: 'Medium',  path: 'category' });
Category.relationship({ ref: 'Photo',   path: 'category' });
Category.relationship({ ref: 'Post',    path: 'category' });
Category.relationship({ ref: 'Quote',   path: 'category' });

Category.register();
