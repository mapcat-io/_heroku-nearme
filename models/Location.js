var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Location = new keystone.List('Location', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

Location.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    location: { type: Types.Location, defaults: { country: 'United States' } }
});

Location.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Location.register();
