// for Place
var keystone = require('keystone'),
    Place = keystone.list('Place');

exports = module.exports = function(req, res) {
    // get a thing
    Place.model.findById(req.params.id, function (err, place) {
      if (err) throw err;
      res.json({place: place});
    });
}
