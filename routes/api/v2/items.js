var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {
  var q = req.query.q.trim() || '', // search term
      t = req.query.t || '', // raw, aggregate or find variations
      u = req.query.u || '', // ios deviceId
      lat = req.query.lat || '',
      long =  req.query.long || '';

  // regex to match any string that starts with q
  q = '\\b' + q + '\\S*';

  var query = [
    // fields to check for the search
    {"name": { "$regex": q, "$options": "i" }},
    {"meta.superThing": { "$regex": q, "$options": "i" }},
    {"meta.commonName": { "$regex": q, "$options": "i" }},
    {"category.name": { "$regex": q, "$options": "i" }},
    {"location.name": { "$regex": q, "$options": "i" }},
    {"location.categoryName": { "$regex": q, "$options": "i" }},
  ];
  // latest aggregated results
  if (t === 'aggregate') {
    Item.model.aggregate(
    { $match: { $or: query}},
    {
      $group : { // "$addToSet" pushes only unique values
         _id : {"name": "$location.name", "street": "$location.street" },
         "things": { "$addToSet": "$name" },
         "categories": { "$addToSet": "$category.name" },
         "images": { "$addToSet": "$primaryImage" },
         "locations": { "$addToSet": "$location" },
         "count": { "$sum": 1 },
         "totalThings": { "$sum": "things" }
      }
    },
    function(err, items) {
      if (err) throw err;
      // google analytics
      utilities.analyticsEventAPI('api', 'search', req, 1, u);
      // all the items
      res.json({items: items});
    });

  }
  if (t === 'test') {
    Item.model.aggregate(
    { $match: { $or:
      // fields to check for the search
      {"name": { "$regex": q, "$options": "i" }},
    }},
    function(err, items) {
      if (err) throw err;
      // google analytics
      console.log();
      // all the items
      res.json({items: items});
    });

  }
  // previous find results
  else {

    Item.model.find({ $or: query}, function(err, items) {
      if (err) throw err;
      // google analytics
      utilities.analyticsEventAPI('api', 'search', req, 1, u);
      // all the items
      res.json({items: items});
    });

  }


}
