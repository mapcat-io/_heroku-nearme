var foursquare = require('foursquarevenues')(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_SECRET);
var logger = require("../../../utils/logger");

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  var lat = req.query.lat || '',
      long = req.query.long || '',
      page = req.query.page || 1,
      resultsPerPage = 10,
      radius = req.query.radius || 200,
      result = {};

  var params = {
      'll': lat + ',' + long,
      'limit': resultsPerPage,
      'radius' : radius
      };
      
  foursquare.getVenues(params, function(error, venues) {
		if (!error) {
      result = venues.response;
      res.json(result);
		}
    else {
      res.json(error);
    }
  });


};
