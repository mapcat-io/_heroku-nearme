var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities'),
    logger = require("../../../utils/logger"),
    cache = require("../../../utils/cache"),
    aggregate_paginator = require("../../../utils/aggregate_paginate");


exports = module.exports = function(req, res) {

  var q = req.query.q || '', // search term
      t = req.query.t || '', // raw, aggregate or find variations
      u = req.query.u || '', // ios deviceId
      lat = req.query.lat || '',
      long =  req.query.long || '',
      page =  req.query.page || '';

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
  
    var cache_key = "q:" + q +"u:"+ u +"t:"+t+"lat:"+lat+ "long:"+long + "page:" +page;
  logger.debug("q: " + q + " query: " + query + "cache_key:" + cache_key);
  
  // latest aggregated results
  if (t === 'aggregate') {
      
    var aggregateQuery = Item.model.aggregate(
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
    });
    
   var ttl = 600;
    var queryOptions = { page : req.query.page || 1, limit : 10};
    cache.wrap(cache_key, function(cacheCallback) {
         aggregate_paginator(Item.model, aggregateQuery, queryOptions,cacheCallback ); 
    }, {ttl: ttl}, function(err, items, pageCount, count) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("pageCount: " + pageCount + " count: " + count);
              // google analytics
            utilities.analyticsEventAPI('api', 'search', req, 1, u);
            res.json({items: items});
        }
    });
    
   

  }else if (t === 'test') {
      logger.debug(" test agreegate ");
         var aggregateQuery =  Item.model.aggregate(
      { $match: { $or: [{"name": { "$regex": q, "$options": "i" }}]}});
       var queryOptions = { page : req.query.page || 1, limit : 10};
       
       
       var queryOptions = { page : req.query.page || 1, limit : 10};
    cache.wrap(cache_key, function(cacheCallback) {
         aggregate_paginator(Item.model, aggregateQuery, queryOptions,cacheCallback ); 
    }, {ttl: ttl},function(err, items, pageCount, count) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug("pageCount: " + pageCount + " count: " + count);
            logger.debug("agreegate items " + items);
            res.json({items: items});
        }
    });
    
    
       
      
       
  } else {

     Item.paginate({
       filters:query,
        page: req.query.page || 1,
        perPage: 10,
        maxPages: 10
    }).exec(function(err, items) {
        if (err) throw err;
      // google analytics
      utilities.analyticsEventAPI('api', 'search', req, 1, u);
      // all the items
      res.json({items: items});
    });
    
  }// end of else

};
