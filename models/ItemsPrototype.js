var keystone = require('keystone'),
    Types = keystone.Field.Types;

var ItemsPrototype = new keystone.List('ItemsPrototype', {
    map: { name: 'name' },
    track: true,
    defaultSort: '-name'
});

ItemsPrototype.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  place: { type: String },
  placeId: { type: String },
  lat: { type: String },
  long: { type: String },
  category: { type: String }
});

ItemsPrototype.defaultColumns = 'name, state|20%'
ItemsPrototype.register();
