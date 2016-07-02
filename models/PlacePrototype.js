var keystone = require('keystone'),
    Types = keystone.Field.Types;

var PlacePrototype = new keystone.List('PlacePrototype', {
    map: { name: 'name' },
    track: true,
    defaultSort: '-name'
});

PlacePrototype.add({
    name: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
    street:{ type: String },
    city: { type: String },
    zip: { type: String }
});

PlacePrototype.defaultColumns = 'name, state|20%, author, publishedAt|15%'
PlacePrototype.register();
