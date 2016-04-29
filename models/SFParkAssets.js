var keystone = require('keystone'),
    Types = keystone.Field.Types;

var SFParkAssets = new keystone.List('SFParkAssets', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: 'title'
});

SFParkAssets.add({
  title: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  publishedAt: Date,
  quantity: {type: Types.Number, required: false },
  description: { type: Types.Textarea },
  location: { type: Types.Location, defaults: { country: 'United States' } },
  primaryImage: { type: Types.S3File },
  //location: { type: Types.Location, defaults: { country: 'United States' } }
});

SFParkAssets.relationship({ path: 'things', ref: 'Thing', refPath: 'place' });

SFParkAssets.defaultColumns = 'title, slug|20%'
SFParkAssets.register();
