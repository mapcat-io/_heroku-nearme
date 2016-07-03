var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    foursquare = require('foursquarevenues')(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_SECRET);

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Render the view
	view.render('login-home', {layout: 'login', title: 'Login Home'});

};
