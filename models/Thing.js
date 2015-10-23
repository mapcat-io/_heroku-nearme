var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Thing = new keystone.List('Thing', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    track: true,
    defaultSort: '-updatedAt'
});

Thing.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    publishedAt: Date,
    superThing: { type: Types.Relationship, ref: 'SuperThing' },
    place: { type: Types.Relationship, ref: 'Place', many: true },
    category: { type: Types.Relationship, ref: 'GoogleProduct', many: true },
    description: { type: Types.Textarea },
    primaryImage: { type: Types.S3File },
    //location: { type: Types.Location, defaults: { country: 'United States' } }
});

Thing.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Thing.register();
