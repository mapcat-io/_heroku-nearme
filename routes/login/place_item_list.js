var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    TopThingsPrototype = keystone.list('TopThingsPrototype');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  var lat = req.query.lat || '',
      long = req.query.long || '',
      id = req.query.id || '',
      name = req.query.name || '';

  console.log(name);

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'login-home';

  var backUrl = req.headers.referer || '/login/home';
  console.log(backUrl);

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
    var q = TopThingsPrototype.model.find({}).sort({ 'name' : 1})
    q.exec(function (err, result) {
      locals.topthings = result;
      next(err);
    });

  });

	// Render the view
	view.render('login-place-item-list', {layout: 'login', id: id, lat: lat, long: long, name: name, title: 'Top Things', backUrl: backUrl});

};
