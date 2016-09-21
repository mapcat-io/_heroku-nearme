var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities'),
    logger = require("../../../utils/logger"),
    aggregate_paginator = require("../../../utils/aggregate_paginate");

exports = module.exports = function(req, res) {

  var u = req.query.u || '', // ios deviceId
      t = req.query.t || ''; // ios deviceId

      // individual user stats
      if (u != '' && t === 'profile') {
      var aggregateQuery =  Item.model.aggregate(
      {
        $group : { // "$addToSet" pushes only unique values
           _id : "$source.deviceId",
           "count": { "$sum": 1 },
           "places": { "$addToSet": "$location.name" },
        }
      },
      { $match : { "_id" : u } });
      
       var queryOptions = { page : req.query.page || 1, limit : 10};
   
     aggregate_paginator(Item.model, aggregateQuery, queryOptions, function(err, items, pageCount, count) {
        if (err) throw err;
        // google analytics
        utilities.analyticsEventAPI('api', 'search', req, 1, u);
        // all the items
        res.json({items: items});
      });
  }
  // ranked stats
  else {
     var aggregateQuery =  Item.model.aggregate(
    { $match: { $and: [
      { "source.deviceId" : { $ne: null }},
      { "source.deviceId" : { $ne: "" }}
    ]}},
    // { $match: { "source.deviceId" : { $ne: null }} },
    {
      $group : { // "$addToSet" pushes only unique values
         _id : "$source.deviceId",
         "count": { "$sum": 1 },
         "places": { "$addToSet": "$location.name" },
      }
    },
    { $sort : { "count" : -1 } });
    
    var queryOptions = { page : req.query.page || 1, limit : 10};
   
    aggregate_paginator(Item.model, aggregateQuery, queryOptions, function(err, items, pageCount, count) {
      if (err) throw err;
      // google analytics
      utilities.analyticsEventAPI('api', 'search', req, 1, u);
      // all the items
      res.json({items: items});
    });
  }

};
