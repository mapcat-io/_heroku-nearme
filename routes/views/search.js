// for Things functions
var keystone = require('keystone'),
    Thing = keystone.list('Thing');

exports = module.exports = function(req, res) {
    console.log("/search");
    var q = req.query.q || '';
    // get all the things
    Thing.model.find({title: { "$regex": q, "$options": "i" }}, function(err, things) {
      if (err) throw err;
      // all the things
      res.render('search', {layout: 'main', title: "The Near Me Project", things: things});
    }).populate('superThing place');
}
