var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {
  var q = req.query.q.trim() || '', // search term
      t = req.query.t || ''; // raw result

  // regex to match word starts with q
  q = '\\b' + q + '\\S*';

  Item.model.find({ $or: [
      // fields to check for the search
      {"name": { "$regex": q, "$options": "i" }},
      {"description": { "$regex": q, "$options": "i" }},
      {"category.name": { "$regex": q, "$options": "i" }},
      {"location.name": { "$regex": q, "$options": "i" }},
      {"location.categoryName": { "$regex": q, "$options": "i" }},
      {"location.categoryYelp": { "$regex": q, "$options": "i" }},
    ]}, function(err, items) {
    if (err) throw err;
    // google analytics
    utilities.analyticsEventAPI('api', 'search', req, 1);
    // all the items
    res.json({items: items});
  });

}
