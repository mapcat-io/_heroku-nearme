var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {

  var u = req.query.u || '', // ios deviceId
      t = req.query.t || ''; 

  // individual user stats
  Item.model.aggregate(
  {
    $group : { // "$addToSet" pushes only unique values
       _id : null,
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
