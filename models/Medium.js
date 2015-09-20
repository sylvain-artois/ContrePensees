var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types      = keystone.Field.Types,
    Medium     = new keystone.List('Medium', {
        defaultSort: '-publishedDate'
    });

Medium.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Boolean },
    content: { type: Types.Html, wysiwyg: true, height: 400 },
    caption: { type: Types.Html, wysiwyg: true, height: 200 },
    captionText: { type: String, hidden: true },
    tags: { type: Types.Text },
    author: { type: Types.Relationship, ref: 'User', index: true },
    category: { type: Types.Relationship, ref: 'Category', index: true }
});

//Index data for full text search
Medium.schema.pre('save', function(next) {
    if (this.caption) {
        this.captionText = decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

Medium.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

Medium.schema.plugin(textSearch);
Medium.schema.index({
    tags: 'text',
    captionText: 'text'
}, {
    default_language:'fr'
});

Medium.defaultColumns = 'caption|30%, category, publishedDate';

Medium.register();
