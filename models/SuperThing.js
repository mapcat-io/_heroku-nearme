var keystone = require('keystone'),
    Types = keystone.Field.Types;

var SuperThing = new keystone.List('SuperThing', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});

SuperThing.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date
});

SuperThing.defaultColumns = 'title, state|20%, author, publishedAt|15%'
SuperThing.register();
