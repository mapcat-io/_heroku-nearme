var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Item = new keystone.List('Item', {
    autokey: { path: 'mapcatId', from: '_id', fixed: true },
    map: { name: 'name' },
    track: true,
    defaultSort: '-createdAt'
});

Item.add({
  state: { type: Types.Select, options: 'draft, published, archived', default: 'published' },
  name: { type: String, required: true },
  description: { type: Types.Textarea },
  primaryImage: { type: Types.S3File, path: 'heroku-nearme', filename: function(item, filename){ return item._id + '-' + filename; }, allowedTypes: ['image/gif', 'image/jpeg', 'image/png'] },
  csvId: { type: String },
  source: {
    name: { type: String },
    id: { type: String }
  },
  // meta
  meta: {
    superThing: { type: String },
    brandName: { type: String }
  },
  // category
  category: {
    name: { type: String },
    googleProduct: { type: String }
  },
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
    twitterId: { type: String, note: 'The username, e.g., @mapcatio' },
    // urls
    siteUrl: { type: Types.Url },
    // foursquareUrl: { type: Types.Url },
    yelpUrl: { type: Types.Url },
    facebookUrl: { type: Types.Url },
    instagramUrl: { type: Types.Url },
    // twitterUrl: { type: Types.Url },
    googleStreetViewUrl: { type: Types.Url },
    googleSeeInsideUrl: { type: Types.Url },
  }
});

Item.defaultColumns = 'name, location.name, csvId, mapcatId, state'
Item.register();
