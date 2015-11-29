var keystone = require('keystone'),
    Types = keystone.Field.Types,
    Category = new keystone.List('Category', {
        autokey: { from: 'name', path: 'key', unique: true }
    });

Category.add({
    name: { type: String, required: true },
    header: { type: Types.Html, wysiwyg: true, height: 200 },
    author: { type: Types.Relationship, ref: 'User' },
});

Category.schema.virtual('url').get(function() {
    //Fixme hardcode, how-to load relationship here
    return (this.name === 'Software') ? '/sylvain-artois/software' : '/dye-pop/' + this.key;
});

Category.relationship({ ref: 'Post', path: 'categoriesPath' });
Category.register();
