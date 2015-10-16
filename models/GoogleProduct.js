var keystone = require('keystone'),
    Types = keystone.Field.Types;

var GoogleProduct = new keystone.List('GoogleProduct', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: 'title'
});

GoogleProduct.add({
    title: { type: String, required: true },
    parents: { type: Types.Relationship, ref: 'GoogleProduct', many: true }
});

GoogleProduct.relationship({ path: 'things', ref: 'Thing', refPath: 'category' });

GoogleProduct.defaultColumns = 'title, slug|20%'
GoogleProduct.register();
