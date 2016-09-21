var keystone = require('keystone'),
    Item = keystone.list('Item');

// instantiate Redis to Go
var rtg = require("url").parse(process.env.REDISTOGO_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname);
redis.auth(rtg.auth.split(":")[1]);

exports = module.exports = function(req, res) {
  var q = req.query.q || '', // search term
      u = req.query.u || '', // ios deviceId
      lat = req.query.lat || '',
      long =  req.query.long || '';

  //= Set up
  var maxDistance = 1609.34; // distance to use for near query in meters
  // round location
  long = Math.round(long * 100) / 100;
  lat = Math.round(lat * 100) / 100;
  // trim + regex to match any string that starts with `q`
  q = q.trim()
  q = '\\b' + q + '\\S*';
  // fields to query
  var query = [
    // fields to check for the search
    {"name": { "$regex": q, "$options": "i" }},
    {"meta.superThing": { "$regex": q, "$options": "i" }},
    {"category.name": { "$regex": q, "$options": "i" }},
    {"location.name": { "$regex": q, "$options": "i" }},
  ];

  var cacheQueryKey = q + '-' + long + '-' + lat;

  redis.get(cacheQueryKey, function (err, reply) {
    if (err) {
      // return error
      res.json({items: err});
    } else if (reply) {
      //Book exists in cache return cached result
      res.json({items: reply});
    } else {
      //Query doesn't exist in cache - we need to query mongodb
      Item.model.aggregate({
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
          "location": { "$first": "$location" }
        }
      },
      { "$sort" : { "distance": 1 }},
      function (err, items) {
        if (err || !items) {
          // return error
          res.json({items: null});
        } else {
          // Book found in database, save to cache and return to client
          redis.set(cacheQueryKey, items, function () {
            res.json({items: items});
          });
        }
      });
    }
  });










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
