var keystone = require('keystone'),
    PlacePrototype = keystone.list('PlacePrototype'),
    foursquare = require('foursquarevenues')(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_SECRET);

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    var lat = req.query.lat || '',
        long = req.query.long || '',
        page = req.query.page || 1,
        resultsPerPage = 10,
        radius = req.query.radius || 200,
        result = {};

    var params = {
        'll' : lat + ',' + long,
        'limit' : resultsPerPage,
        'radius' : radius
    };

    // Load Top Things Prototype
    view.on('init', function(next) {

        foursquare.getVenues(params, function(error, venues) {
            if (!error) {
                locals.places = venues.response.venues;
                console.log(venues.response.venues);
                next(error);
            } else {
                next(error);
            }
        });

    });

    // Render the view
    view.render('login-places', {
        layout : 'login',
        title : 'Places'
    });

};
