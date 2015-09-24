var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types = keystone.Field.Types,
    Post = new keystone.List('Post', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true },
        defaultSort: '-publishedDate'
    });

Post.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Boolean },
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
    briefText: { type: String, hidden: true },
    extendedText: { type: String, hidden: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    categories: { type: Types.Relationship, ref: 'Category', many: true },
    tags: { type: Types.Text }
});

Post.schema.virtual('fullContent').get(function() {
    return this.extended + this.brief;
});

Post.schema.virtual('randomPhoto').get(function() {
    return commonlib.randomPhoto();
});

Post.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

//Index data for full text search
Post.schema.pre('save', function(next) {
    if (this.brief) {
        this.briefText = decode(
            this.brief.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.extended) {
        this.extendedText = decode(
            this.extended.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

//Enable fullText search
Post.schema.plugin(textSearch);
Post.schema.index({
    tags: 'text',
    title: 'text',
    briefText: 'text',
    extendedText: 'text'
}, {
    default_language:'fr'
});

Post.defaultColumns = 'title|30%, category, state, publishedDate';
Post.register();
