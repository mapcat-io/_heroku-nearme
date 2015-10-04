var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Thing = new keystone.List('Thing', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Thing.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    superThing: {type: Types.Relationship, ref: 'SuperThing' },
    location: { type: Types.Location, defaults: { country: 'United States' } }
});

Thing.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Thing.register();
