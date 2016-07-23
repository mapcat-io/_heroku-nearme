var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {

  var u = req.query.u || '', // ios deviceId
      t = req.query.t || ''; // ios deviceId

  // individual user stats
  if (u != '' && t === 'profile') {
      Item.model.aggregate(
      {
        $group : { // "$addToSet" pushes only unique values
           _id : "$source.deviceId",
           "count": { "$sum": 1 },
           "places": { "$addToSet": "$location.name" },
        }
      },
      { $match : { "_id" : u } },
      function(err, items) {
        if (err) throw err;
        // google analytics
        utilities.analyticsEventAPI('api', 'search', req, 1, u);
        // all the items
        res.json({items: items});
      });
  }
  // ranked stats
  else {
    Item.model.aggregate(
    { $match: { "source.deviceId" : { $ne: null }} },
    {
      $group : { // "$addToSet" pushes only unique values
         _id : "$source.deviceId",
         "count": { "$sum": 1 },
         "places": { "$addToSet": "$location.name" },
      }
    },
    { $sort : { "count" : -1 } },
    function(err, items) {
      if (err) throw err;
      // google analytics
      utilities.analyticsEventAPI('api', 'search', req, 1, u);
      // all the items
      res.json({items: items});
    });
  }

}
