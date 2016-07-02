var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'login-home';

  // Load Places
  view.on('init', function (next) {

    var q = PlacePrototype.model.find({})

    q.exec(function (err, result) {
      locals.places = result;
      next(err);
    });

  });

	// Render the view
	view.render('login-home', {layout: 'login', title: 'Places'});

};
