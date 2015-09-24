var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types      = keystone.Field.Types,
    Gallery    = new keystone.List('Gallery', {
        defaultSort: '-publishedDate'
    });

Gallery.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Boolean },
    images: { type: Types.CloudinaryImages },
    caption: { type: Types.Html, wysiwyg: true, height: 200 },
    captionText: { type: String, hidden: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    categories: { type: Types.Relationship, ref: 'Category', many: true },
    tags: { type: Types.Text }
});

//Index data for full text search
Gallery.schema.pre('save', function(next) {
    if (this.caption) {
        this.captionText = decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

Gallery.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

Gallery.schema.plugin(textSearch);
Gallery.schema.index({
    tags: 'text',
    captionText: 'text'
}, {
    default_language:'fr'
});

Gallery.defaultColumns = 'caption|30%, category, publishedDate';

Gallery.register();
