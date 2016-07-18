var keystone = require('keystone'),
    Types = keystone.Field.Types;

var TopThings = new keystone.List('TopThings', {
  autokey: { path: 'mapcatId', from: '_id', fixed: true },
  map: { name: 'name' },
  track: true,
  defaultSort: '-createdAt'
});

TopThings.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  csvId: { type: String },
  category: {
    thing: { type: String },
    place: { type: String },
    foursquareId: { type: String }, // ideally determines whether the item is displayed for the add place top things view
    googleProduct: { type: String }
  }
});

TopThings.defaultColumns = 'name, state|20%'
TopThings.register();
