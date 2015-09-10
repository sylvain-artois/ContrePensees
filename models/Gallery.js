var keystone   = require('keystone'),
	textSearch = require('mongoose-text-search'),
	decode     = require('ent/decode');

var Types      = keystone.Field.Types,
	removeTagsRegex = /(<([^>]+)>)/ig;

var Gallery = new keystone.List('Gallery', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Gallery.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	pinned: { type: Boolean },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	updatedAt: { type: Types.Date, index: true,  noedit: true },

	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

Gallery.register();
