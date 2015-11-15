var keystone   = require('keystone'),
    textSearch = require('mongoose-text-search'),
    ent        = require('ent'),
    commonlib  = require('./lib/common'),
    truncate   = require('html-truncate');

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
    isSoftwareRelated: { type: Types.Boolean, default: false },

    title: { type: Types.Text, dependsOn: { type: 'text' } },
    image: { type: Types.CloudinaryImage, autoCleanup : true, select : true, dependsOn: { type: ['text', 'photo'] } },
    medium: { type: Types.Html, wysiwyg: true, height: 150,  dependsOn: { type: 'medium' } },
    brief: { type: Types.Html, wysiwyg: true, height: 150,  dependsOn: { type: 'text' } },
    content: { type: Types.Html, wysiwyg: true, height: 400, dependsOn: { type: 'text' } },
    images: { type: Types.CloudinaryImages, dependsOn: { type: 'gallery' } },
    quote: { type: Types.Html, wysiwyg: true, height: 150, dependsOn: { type: 'quote' } },
    writer: { type: Types.Text, dependsOn: { type: 'quote' } },
    caption: { type: Types.Html, wysiwyg: true, height: 150, dependsOn: { type: ['photo','medium', 'gallery', 'quote'] } },

    tags: { type: Types.Text },

    author: { type: Types.Relationship, ref: 'User', index: true },
    categories: { type: Types.Relationship, ref: 'Category', many: true },

    createdAt: { type: Types.Datetime, noedit: true },
    updatedAt: { type: Types.Datetime, noedit: true },

    contentText: { type: String, hidden: true },
    briefText: { type: String, hidden: true },
    captionText: { type: String, hidden: true },
    quoteText: { type: String, hidden: true }
});

Post.schema.virtual('randomPhoto').get(function() {
    return commonlib.randomPhoto();
});

Post.schema.virtual('tagsArray').get(function() {
    return (this.tags) ? this.tags.split(',').map(function(s){return s.trim()}) : [];
});

Post.schema.virtual('searchRelated').get(function() {
    return commonlib.searchRelated(this);
});

Post.schema.virtual('url').get(function() {
    return commonlib.postUrl(this);
});

Post.schema.virtual('fullUrl').get(function() {
    return commonlib.getSiteUrl('production') + commonlib.postUrl(this);
});

Post.schema.virtual('shortBrief').get(function() {
    return commonlib.brief(this, 'brief', 200);
});

Post.schema.virtual('quoteBrief').get(function() {
    return commonlib.brief(this, 'quote', 70);
});

Post.schema.virtual('captionBrief').get(function() {
    return commonlib.brief(this, 'caption', 200);
});

Post.schema.virtual('pageTitle').get(function() {
    return commonlib.pageTitle(this);
});

Post.schema.virtual('desc').get(function() {
    return commonlib.desc(this);
});

Post.schema.methods.share = function(service) {
    if (service === 'tumblr') {
        return commonlib.shareOnTumblr(this);
    } else if (service === 'pinterest') {
        return commonlib.shareOnPinterest(this);
    } else if (service === 'twitter') {
        return commonlib.shareOnTwitter(this);
    }

    return "";
};

Post.schema.methods.facebookShareUrl = function(fbId) {
    return "https://www.facebook.com/dialog/share?app_id=[APP_ID]&display=popup&href=[HREF]&redirect_uri=[REDIRECT]"
        .replace('[APP_ID]', fbId)
        .replace('[HREF]', encodeURIComponent(this.fullUrl))
        .replace('[REDIRECT]', encodeURIComponent(this.fullUrl));
};

//Index data for full text search
Post.schema.pre('save', function(next) {
    if (this.content) {
        this.contentText = ent.decode(
            this.content.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.brief) {
        this.briefText = ent.decode(
            this.brief.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.caption) {
        this.captionText = ent.decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    if (this.quote) {
        this.quoteText = ent.decode(
            this.caption.replace(commonlib.removeTagsRegex(), "")
        );
    }
    next();
});

//Handle createdAt||updatedAt readonly fields
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
    writer: 'text',
    briefText: 'text',
    contentText: 'text',
    captionText: 'text',
    quoteText: 'text',
}, {
    default_language:'fr'
});

Post.defaultColumns = 'type, category, state, publishedDate, content';
Post.register();
