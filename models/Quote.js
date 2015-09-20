var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types = keystone.Field.Types,
    Quote = new keystone.List('Quote', {
        defaultSort: '-publishedDate'
    });

Quote.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Boolean },
    quote: { type: Types.Html, wysiwyg: true, height: 400 },
    caption: { type: Types.Html, wysiwyg: true, height: 200 },
    quoteText: { type: String, hidden: true },
    captionText: { type: String, hidden: true },
    tags: { type: Types.Text },
    category: { type: Types.Relationship, ref: 'Category', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true }
});

Quote.schema.virtual('randomPhoto').get(function() {
    return commonlib.randomPhoto();
});

Quote.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

Quote.schema.pre('save', function(next) {
    if (this.quote) {
        this.quoteText = decode(
            this.quote.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.caption) {
        this.captionText = decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

//Enable fullText search
Quote.schema.plugin(textSearch);
Quote.schema.index({
    tags: 'text',
    quoteText: 'text',
    captionText: 'text'
}, {
    default_language: 'fr'
});

Quote.defaultColumns = 'quote|40%, category, publishedDate';
Quote.register();
