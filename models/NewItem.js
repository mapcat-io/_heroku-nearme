var keystone = require('keystone'),
    GoogleProduct = keystone.list('GoogleProduct'),
    //Place = keystone.list('Place'),
    //SuperThing = keystone.list('SuperThing'),
    Types = keystone.Field.Types;

var NewItem = new keystone.List('NewItem', {
    autokey: { path: 'slug', from: 'thing place', unique: true },
    track: true,
    defaultSort: '-updatedAt',
    drilldown: 'thing place'
});

NewItem.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    thing: { type: Types.Relationship, ref: 'NewThing', initial: true },
    place: { type: Types.Relationship, ref: 'NewPlace', many: true },
    description: { type: Types.Textarea },
    primaryImage: { type: Types.S3File },
    location: {
        longitude: { type: Types.Number },
        latitude: { type: Types.Number }
    }
});

NewItem.defaultColumns = 'thing, state|20%, place'
NewItem.register();
