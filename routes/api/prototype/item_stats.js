var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {

  var u = req.query.u || '', // ios deviceId
      t = req.query.t || ''


  if (t == 'profile') {
      Item.model.aggregate(
      {
        $group : { // "$addToSet" pushes only unique values
           _id : "$source.deviceId",
           "count": { "$sum": 1 },
           "places": { "$addToSet": "$location.name" },
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
  else {
    Item.model.aggregate(
    {
      $group : { // "$addToSet" pushes only unique values
         _id : "$source.deviceId",
         "count": { "$sum": 1 },
         "places": { "$addToSet": "$location.name" },
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

}
