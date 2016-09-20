var keystone = require('keystone'),
    GeoItem = keystone.list('GeoItem'),
    logger = require("../../../utils/logger"),
    cache = require("../../../utils/cache"),
    aggregate_paginator = require("../../../utils/aggregate_paginate");

exports = module.exports = function(req, res) {
  var q = req.query.q || '', // search term
      u = req.query.u || '', // ios deviceId
      lat = req.query.lat || '',
      long =  req.query.long || '',
      page =  req.query.page || '';

  //= Set up
  var maxDistance = 1609.34 * 2; // distance to use for near query in meters
  // round to two decimal points
  long = Math.round(long * 1000) / 1000;
  lat = Math.round(lat * 1000) / 1000;
  // process query
  q = q.trim();
  // regex to match any string that starts with q
  q = '\\b' + q + '\\S*';

  var cache_key = "q:" + q +"u:"+ u +"lat:"+lat+ "long:"+long + "page:" +page;
  logger.debug("q: " + q + " query: " + query + "cache_key:" + cache_key);

  // fields to query
  var query = [
    // fields to check for the search
    {"name": { "$regex": q, "$options": "i" }},
    {"meta.superThing": { "$regex": q, "$options": "i" }},
    {"category.name": { "$regex": q, "$options": "i" }},
    {"location.name": { "$regex": q, "$options": "i" }},
    {"location.categoryName": { "$regex": q, "$options": "i" }},
  ];

  // perform
  var aggregateQuery = GeoItem.model.aggregate(
    {
      $geoNear: {
         near: { type: "Point", coordinates: [ long , lat ] },
         distanceField: "distance",
         maxDistance: maxDistance,
         query: { $or: query},
         limit: 100,
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
    { "$sort" : { "distance": 1 }}
  );

  var ttl = 600;
  var queryOptions = { page : req.query.page || 1, limit : 100};

  cache.wrap(cache_key, function(cacheCallback) {
      aggregate_paginator(GeoItem.model, aggregateQuery, queryOptions, cacheCallback );
    }, {ttl: ttl}, function(err, items, pageCount, count) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("pageCount: " + pageCount + " count: " + count);
            res.json({items: items});
        }
  });

};
