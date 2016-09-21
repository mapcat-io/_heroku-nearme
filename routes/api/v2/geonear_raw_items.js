var keystone = require('keystone'),
    Item = keystone.list('Item');

exports = module.exports = function(req, res) {
  var q = req.query.q || '', // search term
      u = req.query.u || '', // ios deviceId
      lat = req.query.lat || '',
      long =  req.query.long || '';

  //= Set up
  var maxDistance = 1609.34; // distance to use for near query in meters
  // round to two decimal points
  long = Math.round(long * 1000) / 1000
  lat = Math.round(lat * 1000) / 1000
  // process query
  q = q.trim()
  // regex to match any string that starts with q
  q = '\\b' + q + '\\S*';
  // fields to query
  var query = [
    // fields to check for the search
    {"name": { "$regex": q, "$options": "i" }},
    {"meta.superThing": { "$regex": q, "$options": "i" }},
    {"category.name": { "$regex": q, "$options": "i" }},
    {"location.name": { "$regex": q, "$options": "i" }},
  ];

  // perform
  Item.model.aggregate(
  {
    $geoNear: {
       near: { type: "Point", coordinates: [ long , lat ] },
       distanceField: "distance",
       maxDistance: maxDistance,
       query: { $or: query},
       limit: 1000,
       spherical: true,
    }
  },
  {
    $group : {
      _id : {"name": "$location.name", "street": "$location.street" },
      "things": { "$addToSet": "$name" },
      "location": { "$addToSet": "$distance" },
      "distance": { "$addToSet": "$distance" },
      "location": { "$first": "$location" },

    }
  },
  { "$sort" : { "distance": 1 }},
  function(err, items) {
    if (err) throw err;
    // all the items
    res.json({items: items});
  });

}
