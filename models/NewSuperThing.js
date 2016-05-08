var keystone = require('keystone'),
    Types = keystone.Field.Types;

var NewSuperThing = new keystone.List('NewSuperThing', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'name' },
    track: true,
    defaultSort: '-updatedAt'
});

NewSuperThing.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    name: { type: String, required: true },
    category: { type: Types.Relationship, ref: 'GoogleProduct', many: true },
    description: { type: Types.Textarea, collapse: true },
    primaryImage: { type: Types.S3File, collapse: true }
});

NewSuperThing.relationship({ path: 'newThings', ref: 'NewThing', refPath: 'newSuperThing' });

NewSuperThing.defaultColumns = 'name, state|20%, author'
NewSuperThing.register();
