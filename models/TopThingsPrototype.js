var keystone = require('keystone'),
    Types = keystone.Field.Types;

var TopThingsPrototype = new keystone.List('TopThingsPrototype', {
  autokey: { path: 'mapcatId', from: '_id', fixed: true },
  map: { name: 'name' },
  track: true,
  defaultSort: '-createdAt'
});

TopThingsPrototype.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  csvId: { type: String },
  category: { type: String },
});

TopThingsPrototype.defaultColumns = 'name, state|20%'
TopThingsPrototype.register();
