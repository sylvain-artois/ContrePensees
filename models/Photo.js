var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types      = keystone.Field.Types,
    Photo = new keystone.List('Photo', {
        defaultSort: '-publishedDate'
    });

Photo.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Boolean },
    image: { type: Types.CloudinaryImage },
    caption: { type: Types.Html, wysiwyg: true, height: 200 },
    captionText: { type: String, hidden: true },
    tags: { type: Types.Text },
    author: { type: Types.Relationship, ref: 'User', index: true },
    category: { type: Types.Relationship, ref: 'Category', index: true }
});

//Index data for full text search
Photo.schema.pre('save', function(next) {
    if (this.caption) {
        this.captionText = decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

Photo.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

Photo.schema.plugin(textSearch);
Photo.schema.index({
    tags: 'text',
    captionText: 'text'
}, {
    default_language:'fr'
});

Photo.defaultColumns = 'image, caption|30%, category, publishedDate';

Photo.register();
