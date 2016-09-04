var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities'),
    logger = require("../../../utils/logger"),
    aggregate_paginator = require("../../../utils/aggregate_paginate");


exports = module.exports = function(req, res) {
  var q = req.query.q || '', // search term (place)
      u = req.query.u || ''; // ios deviceId

  console.log("q: " + q);

  var query = [
    // fields to check for the search
    {"location.name": q},
  ];
  // aggregate results
  var aggregateQuery = Item.model.aggregate(
  { $match: { $or: query}},
  {
    $group : { // "$addToSet" pushes only unique values
       _id : {"name": "$location.name", "street": "$location.street" },
       "things": { "$addToSet": "$name" },
       "count": { "$sum": 1 },
       "totalThings": { "$sum": "things" }
    }
  },
  // Unwind it again
  {"$unwind": "$things"},
  // Sort how you want to
  {"$sort": { "things": 1} },
  // Use $push for a regular array
  { "$group": {
      _id : {"name": "$location.name", "street": "$location.street" },
      "things": {"$push": "$things" }
    }
  });
  
  
    var queryOptions = {
        page : req.query.page || 1,
        limit : 10
    };

    aggregate_paginator(Item.model, aggregateQuery, queryOptions, function(err, items, pageCount, count) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("pageCount: " + pageCount + " count: " + count);
            //logger.debug("agreegate items " + items);
            // google analytics
            utilities.analyticsEventAPI('api', 'items-in-place', req, 1, u);
            res.json({
                items : items
            });
        }
    });


};