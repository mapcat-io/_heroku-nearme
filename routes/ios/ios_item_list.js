var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    TopThings = keystone.list('TopThings');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

  var address = req.query.address || '',
      id = req.query.id || '',
      categoryName = req.query.categoryName || '',
      city = req.query.city || '',
      country = req.query.country || '',
      lat = req.query.lat || '',
      long = req.query.long || '',
      name = req.query.name || '',
      phone = req.query.phone || '',
      postalCode = req.query.postalCode || '',
      state = req.query.state || '',
      source = req.query.source || '',
      deviceId = req.query.deviceId || '',
      twitterId = req.query.twitterId || '',
      url = req.query.url || '';

  console.log(country);

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
    var q = TopThings.model.find({})
    q.exec(function (err, result) {
      locals.topthings = result;
      next(err);
    });

  });

	// Render the view
	view.render('ios-item-list', {
  layout: 'ios',
  source: 'webView',
  address: address,
  id: id,
  categoryName: categoryName,
  city: city,
  country: country,
  lat: lat,
  long: long,
  name: name,
  phone: phone,
  postalCode: postalCode,
  state: state,
  source: source,
  deviceId: deviceId,
  twitterId: twitterId,
  title: 'Top Things'});
};
