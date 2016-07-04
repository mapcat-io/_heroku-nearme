var foursquare = require('foursquarevenues')(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_SECRET);

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  var lat = req.query.lat || '',
      long = req.query.long || '',
      result = {};

  var params = {'ll': lat + ',' + long}

  foursquare.getVenues(params, function(error, venues) {
		if (!error) {
      result = venues.response;
      console.log(venues.response);
      res.json(result);
		}
    else {
      console.log(error);
      res.json(error);
    }
  });


}
