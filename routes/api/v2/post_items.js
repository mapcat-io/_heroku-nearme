var keystone = require('keystone'),
    async = require('async'),
		Item = keystone.list('Item'),
    TopThings = keystone.list('TopThings'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {

  if (req.method == 'POST') {
    var data = (req.method == 'POST') ? req.body : req.query;
    var deviceId = data["source"]["deviceId"] || '';
    var obj = {
      "location": {
        "name": data["foursquare"]["name"],
        "lat": data["foursquare"]["location"]["lat"],
        "long": data["foursquare"]["location"]["lng"],
        "foursquareId": data["foursquare"]["id"],
        "street": data["foursquare"]["location"]["address"],
        "postalCode": data["foursquare"]["location"]["postalCode"],
        "city": data["foursquare"]["location"]["city"],
        "state": data["foursquare"]["location"]["state"],
        "country": data["foursquare"]["location"]["country"],
        "phone": data["foursquare"]["contact"]["phone"],
        "twitterId": data["foursquare"]["contact"]["twitter"],
        "facebookId": data["foursquare"]["contact"]["facebook"],
        "categoryName": data["foursquare"]["categories"][0]["name"],
        "siteUrl": data["foursquare"]["url"]
      },
      "source": {
        "name": data["source"]["name"],
        "deviceId": data["source"]["deviceId"]
      },
      "dump": {
        "foursquare": data["foursquare"]
      }
    };

    for (var itemName in data["items"]) {
      obj["name"] = data["items"][itemName]
      var item = new Item.model(obj)
      item.save(function(err) {
          if (err) return res.apiError('error', err);
      });
    }
    // item has been saved
    utilities.analyticsEventAPI('api', 'add-item', req, 1, deviceId);
    res.apiResponse({
      post: 'items have been saved'
    });

  }
  else {
      // all the items
      res.json({post: 'items may only be posted from this endpoint.'});
  }

}
