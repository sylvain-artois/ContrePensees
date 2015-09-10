var keystone   = require('keystone');
var textSearch = require('mongoose-text-search');
var Types      = keystone.Field.Types;
var removeTagsRegex = /(<([^>]+)>)/ig;

/**
 * Post Model
 * ==========
 */

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
	updatedAt: { type: Types.Date, index: true, dependsOn: { state: 'published' }, noedit: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		briefText: { type: String, hidden: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
		extendedText: { type: String, hidden: true }
	},
	author: { type: Types.Relationship, ref: 'User', index: true },
	category: { type: Types.Relationship, ref: 'PostCategory', index: true },
	tags: { type: [String] }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.pre('save', function() {
	this._doc.content.briefText = this._doc.brief.replace(removeTagsRegex, "");
	this._doc.content.extendedText = this._doc.extended.replace(removeTagsRegex, "");
});

Post.schema.pre('update', function() {
	this.update({}, { $set: { updatedAt: new Date() } });
});

Post.schema.plugin(textSearch);
Post.schema.index({
	tags: 'text',
	title: 'text',
	briefText: 'text',
	extendedText: 'text'
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
