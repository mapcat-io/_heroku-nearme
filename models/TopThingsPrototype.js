var keystone = require('keystone'),
    Types = keystone.Field.Types;

var TopThingsPrototype = new keystone.List('TopThingsPrototype', {
    map: { name: 'name' },
    track: true,
    defaultSort: '-name'
});

TopThingsPrototype.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' }
});

TopThingsPrototype.defaultColumns = 'name, state|20%'
TopThingsPrototype.register();
