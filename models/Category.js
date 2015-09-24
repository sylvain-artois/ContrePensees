var keystone = require('keystone');
var Category = new keystone.List('Category', {
    autokey: { from: 'name', path: 'key', unique: true }
});

Category.add({
    name: { type: String, required: true }
});

Category.relationship({ ref: 'Gallery', path: 'galleriesCategories' });
Category.relationship({ ref: 'Medium',  path: 'mediaCategories' });
Category.relationship({ ref: 'Photo',   path: 'photosCategories' });
Category.relationship({ ref: 'Post',    path: 'postsCategories' });
Category.relationship({ ref: 'Quote',   path: 'quotesCategories' });

Category.register();
