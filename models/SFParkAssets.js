var keystone = require('keystone'),
    Types = keystone.Field.Types;

var SFParkAssets = new keystone.List('SFParkAssets', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: 'title'
});

SFParkAssets.add({
    title: { type: String, required: true },
    parents: { type: Types.Relationship, ref: 'SFParkAssets', many: true }
});

SFParkAssets.relationship({ path: 'things', ref: 'Thing', refPath: 'category' });

SFParkAssets.defaultColumns = 'title, slug|20%'
SFParkAssets.register();
