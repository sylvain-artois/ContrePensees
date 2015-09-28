var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    decode     = require('ent/decode'),
    commonlib  = require('./lib/common');

var Types = keystone.Field.Types,
    Post = new keystone.List('Post', {
        defaultSort: '-publishedDate',
        map: { name: 'slug' },
        autokey:{ from: "key", path: "slug", unique: true}
    });

Post.add({

    key: { type: Types.Text, required: true,  initial: true },
    type: { type: Types.Select, options: 'text, quote, photo, gallery, medium', default: 'photo', index: true, initial: true },

    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Datetime, index: true, dependsOn: { state: 'published' } },
    pinned: { type: Types.Boolean, default: false },

    title: { type: Types.Text, dependsOn: { type: 'text' } },
    image: { type: Types.CloudinaryImage, dependsOn: { type: ['text', 'photo'] } },
    medium: { type: Types.Html, wysiwyg: true, height: 150,  dependsOn: { type: 'medium' }  },
    brief: { type: Types.Html, wysiwyg: true, height: 150,  dependsOn: { type: 'text' }  },
    content: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: 'text' } },
    images: { type: Types.CloudinaryImages, dependsOn: { type: 'gallery' } },
    quote: { type: Types.Html, wysiwyg: true, height: 150, dependsOn: { type: 'quote' } },
    caption: { type: Types.Html, wysiwyg: true, height: 150, dependsOn: { type: ['photo','medium', 'gallery', 'quote'] }},

    tags: { type: Types.Text },

    author: { type: Types.Relationship, ref: 'User', index: true },
    categories: { type: Types.Relationship, ref: 'Category', many: true },

    createdAt: { type: Types.Datetime, noedit: true },
    updatedAt: { type: Types.Datetime, noedit: true },

    contentText: { type: String, hidden: true },
    briefText: { type: String, hidden: true },
    captionText: { type: String, hidden: true }
});

Post.schema.virtual('randomPhoto').get(function() {
    return commonlib.randomPhoto();
});

Post.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',') : [];
});

//Index data for full text search
Post.schema.pre('save', function(next) {
    if (this.content) {
        this.contentText = decode(
            this.content.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.brief) {
        this.briefText = decode(
            this.brief.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.caption) {
        this.captionText = decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

Post.schema.pre('save', function(next){
    now = new Date();
    this.updatedAt = now;
    if (! this.createdAt ) {
        this.createdAt = now;
    }
    next();
});

//Enable fullText search
Post.schema.plugin(textSearch);
Post.schema.index({
    tags: 'text',
    title: 'text',
    quote: 'text',
    briefText: 'text',
    contentText: 'text',
    captionText: 'text'
}, {
    default_language:'fr'
});

Post.defaultColumns = 'type, category, state, publishedDate, content';
Post.register();
