var keystone = require('keystone'),
    Types = keystone.Field.Types;

var YelpCategory = new keystone.List('YelpCategory', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: 'title'
});

YelpCategory.add({
    title: { type: String, required: true },
    alias: { type: String },
    parents: { type: Types.Relationship, ref: 'YelpCategory', many: true }
});

YelpCategory.defaultColumns = 'title, alias|15%, slug|20%'
YelpCategory.register();
