var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Place = new keystone.List('Place', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    track: true,
    defaultSort: '-updatedAt'
});

Place.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    publishedAt: Date,
    business: { type: Types.Boolean },
    primaryImage: { type: Types.S3File },
    description: { type: Types.Textarea },
    category: { type: Types.Relationship, ref: 'YelpCategory', many: true },
    location: { type: Types.Location, defaults: { country: 'United States' } },
});

Place.relationship({ path: 'things', ref: 'Thing', refPath: 'place' });

Place.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Place.register();
