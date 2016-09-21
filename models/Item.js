var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Item = new keystone.List('Item', {
    autokey: { path: 'mapcatId', from: '_id', fixed: true },
    map: { name: 'name' },
    track: true,
    defaultSort: '-createdAt',
    searchFields: 'name, location.name',
    autoIndexId: true,
    
});

Item.add({
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  name: { type: String, required: true },
  description: { type: Types.Textarea },
  primaryImage: { type: Types.S3File, path: 'heroku-nearme', filename: function(item, filename){ return item._id + '-' + filename; }, allowedTypes: ['image/gif', 'image/jpeg', 'image/png'] },
  csvId: { type: String },
  source: {
    name: { type: String },
    id: { type: String },
    deviceId: { type: String },
    url: { type: Types.Url }
  },
  // meta
  meta: {
    superThing: { type: String },
    commonName: { type: String },
    brandName: { type: String },
    brandUrl: { type: Types.Url },
    countryOrigin: { type: String }
  },
  // item category
  category: {
    name: { type: String },
    googleProduct: { type: String }
  },
  // item tags
  tags: { type: String, note: 'comma separated list' },
  // location
  location: {
    name: { type: String },
    lat: { type: Types.Number },
    long: { type: Types.Number },
    street: { type: String },
    crossStreet: { type: String },
    postalCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    hours: { type: String },
    phone: { type: String },
    // location category
    categoryName: { type: String },
    categoryYelp: { type: String },
    // ids
    foursquareId: { type: String },
    yelpId: { type: String },
    facebookId: { type: String },
    twitterId: { type: String, note: 'The username, e.g., @mapcatio, but don\'t add the \'@\'.' },
    // urls
    siteUrl: { type: Types.Url },
    yelpUrl: { type: Types.Url },
    foursquareUrl: { type: Types.Url },
    facebookUrl: { type: Types.Url },
    instagramUrl: { type: Types.Url },
    googleStreetViewUrl: { type: Types.Url },
    googleSeeInsideUrl: { type: Types.Url },
    zomatoUrl: { type: Types.Url },
  },
  dump: {
    foursquare: { type: String }
  }
});

Item.defaultColumns = 'name, location.name, csvId, mapcatId, state';

Item.register();
