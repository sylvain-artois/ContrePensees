var keystone = require('keystone'),
    Types = keystone.Field.Types,
    Category = new keystone.List('Category', {
        autokey: { from: 'name', path: 'key', unique: true }
    });

Category.add({
    name: { type: String, required: true },
    header: { type: Types.Html, wysiwyg: true, height: 200 },
});

Category.schema.virtual('url').get(function() {
    return (this.name == 'Software') ? '/sylvain-artois/software' : '/dye-pop/' + this.name;
});

Category.relationship({ ref: 'Post', path: 'categoriesPath' });
Category.register();
