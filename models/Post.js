var keystone   = require('keystone'),
	textSearch = require('mongoose-text-search'),
	decode     = require('ent/decode');

var Types      = keystone.Field.Types,
	removeTagsRegex = /(<([^>]+)>)/ig;

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	isQuote: { type: Boolean },
	pinned: { type: Boolean },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	updatedAt: { type: Types.Date, index: true, noedit: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		briefText: { type: String, hidden: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
		extendedText: { type: String, hidden: true }
	},
	author: { type: Types.Relationship, ref: 'User', index: true },
	category: { type: Types.Relationship, ref: 'PostCategory', index: true },
	tags: { type: Types.Text }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

//Index data for full text search
Post.schema.pre('save', function(next) {
	if (this.content && this.content.brief) {
		this.content.briefText = decode(this.content.brief.replace(removeTagsRegex, ""));
	}
	if (this.content && this.content.extended) {
		this.content.extendedText = decode(this.content.extended.replace(removeTagsRegex, ""));
	}
	next();
});

//Populate the updatedAt field
Post.schema.pre('update', function() {
	this.update({}, { $set: { updatedAt: new Date() } });
});

//Enable fullText search
Post.schema.plugin(textSearch);
Post.schema.index({
	tags: 'text',
	title: 'text',
	briefText: 'text',
	extendedText: 'text'
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
