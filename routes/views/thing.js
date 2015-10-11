// for Thing
var keystone = require('keystone'),
    Thing = keystone.list('Thing');

exports = module.exports = function(req, res) {
    console.log("/thing/" + req.params.id);
    // get a thing
    Thing.model.findById(req.params.id, function (err, thing) {
      if (err) throw err;
      res.render('thing', {layout: 'main', title: thing.title, user: req.user, thing: thing});
    }).populate('superThing place');
}
