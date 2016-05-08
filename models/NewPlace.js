var keystone = require('keystone'),
    Types = keystone.Field.Types;

var NewPlace = new keystone.List('NewPlace', {
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'name' },
    track: true,
    defaultSort: '-updatedAt'
});

NewPlace.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
    name: { type: String, required: true },
    category: { type: Types.Relationship, ref: 'YelpCategory', many: true },
    location: { type: Types.Location, defaults: { country: 'United States', suburb: 'San Francisco', state: 'California' } },
    primaryImage: { type: Types.S3File },
    yelpLink: { type: Types.Url },
    facebookLink: { type: Types.Url },
    googleSeeInsideLink: { type: Types.Url },
    googleStreetview: { type: Types.Url }
});

NewPlace.defaultColumns = 'name, location, state|20%, author'
NewPlace.register();
