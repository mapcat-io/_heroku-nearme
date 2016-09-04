var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {

  var id = req.query.id || '',
      u = req.query.u || '';

  Item.model.findById(id, function (err, item) {
    if (err) throw err;
    // google analytics
    utilities.analyticsEventAPI('api', 'item', req, 1, u);
    // the
    res.json({item: item});
  });

};
