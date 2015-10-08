// for Place
var keystone = require('keystone'),
    Place = keystone.list('Place');

exports = module.exports = function(req, res) {
    console.log("/place/" + req.params.id);
    // get a thing
    Place.model.findById(req.params.id, function (err, place) {
      if (err) throw err;
      res.render('place', {layout: 'main', title: "The Near Me Project", place: place});
    });
}
