var keystone = require('keystone'),
    NewPlace = keystone.list('NewPlace');
    Types = keystone.Field.Types;

var NewThing = new keystone.List('NewThing', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'name' },
    track: true,
    defaultSort: '-updatedAt'
});

NewThing.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    barcode: { type: Types.Number },
    name: { type: String, required: true },
    description: { type: Types.Textarea },
    superThing: { type: Types.Relationship, ref: 'NewSuperThing' },
    category: { type: Types.Relationship, ref: 'GoogleProduct', many: true },
    primaryImage: { type: Types.S3File },
    external: {
      source: { type: String },
      id: { type: String }
    },
    tag: { type: Types.Relationship, ref: 'NewThingTag', many: true }
});

NewThing.defaultColumns = 'name, superThing, state|20%, author'
NewThing.register();
