var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {
  var q = req.query.q || '', // search term (place)
      u = req.query.u || ''; // ios deviceId

  console.log("q: " + q);

  var query = [
    // fields to check for the search
    {"location.name": q},
  ];
  // aggregate results
  Item.model.aggregate(
  { $match: { $or: query}},
  {
    $group : { // "$addToSet" pushes only unique values
       _id : {"name": "$location.name", "street": "$location.street" },
       "things": { "$addToSet": "$name" },
       "count": { "$sum": 1 },
       "totalThings": { "$sum": "things" }
    }
  },
  function(err, items) {
    if (err) throw err;
    // google analytics
    utilities.analyticsEventAPI('api', 'items-in-place', req, 1, u);
    // all the items
    res.json({items: items});
  });

}
