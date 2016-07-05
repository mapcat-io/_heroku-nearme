var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    TopThingsPrototype = keystone.list('TopThingsPrototype');

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
      twitterId = req.query.name || '',
      url = req.query.url || '';

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'login-home';

  var backUrl = req.headers.referer || '/login/home';

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
	view.render('login-place-item-list', {
    source: 'webView',
    layout: 'login',
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
    twitterId: twitterId,
    url: url, title: 'Top Things', backUrl: backUrl});
};
