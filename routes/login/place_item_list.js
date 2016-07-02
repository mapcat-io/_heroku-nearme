var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    TopThingsPrototype = keystone.list('TopThingsPrototype');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'login-home';

  // Load Place
  view.on('init', function (next) {
    var q = PlacePrototype.model.findById(req.params.id)
    q.exec(function (err, result) {
      locals.place = result;
      next(err);
    });
  });

  // Load Top Things Prototype
  view.on('init', function (next) {
    var q = TopThingsPrototype.model.find({})
    q.exec(function (err, result) {
      locals.topthings = result;
      console.log(result);
      next(err);
    });

  });

	// Render the view
	view.render('login-place-item-list', {layout: 'login', title: 'Top Things'});

};
