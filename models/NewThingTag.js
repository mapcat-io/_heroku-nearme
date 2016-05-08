var keystone = require('keystone'),
    Types = keystone.Field.Types;

var NewThingTag = new keystone.List('NewThingTag', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'name' },
    defaultSort: 'name'
});

NewThingTag.add({
    name: { type: String, required: true }
});

NewThingTag.defaultColumns = 'name, slug|20%'
NewThingTag.register();
