var keystone   = require('keystone');
var textSearch = require('mongoose-text-search');
var Types      = keystone.Field.Types;

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
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		briefText: { type: String, hidden: true },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
		extendedText: { type: String, hidden: true }
	},
	category: { type: Types.Relationship, ref: 'PostCategory', index: true },
	tags: { type: [String] },
	pinned: { type: Boolean }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.schema.pre('save', function(next) {
	this._doc.briefText = this._doc.brief.replace(/(<([^>]+)>)/ig, "");
	this._doc.extendedText = this._doc.extended.replace(/(<([^>]+)>)/ig, "");
});

Post.schema.plugin(textSearch);

// add a text index to the tags array
Post.schema.index({
	tags: 'text',
	title: 'text',
	briefText: 'text',
	extendedText: 'text'
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
