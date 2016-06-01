// for Thing
var keystone = require('keystone'),
    Thing = keystone.list('Thing');

exports = module.exports = function(req, res) {
    // get a thing
    Thing.model.findById(req.params.id, function (err, thing) {
      if (err) throw err;
      res.json({thing: thing});
    }).populate('category superThing place');
}
