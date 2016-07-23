var keystone = require('keystone'),
    async = require('async'),
		Item = keystone.list('Item'),
    TopThings = keystone.list('TopThings');

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  if (req.method == 'POST') {
    var data = (req.method == 'POST') ? req.body : req.query;
    var items = data['itemName'];

    if (Array.isArray(items)) {
      for (var i = 0; i < items.length; i++) {
        // create item data
        var obj = {};
        obj["location"] = {};
        obj["category"] = {};
        obj["source"] = {};
        obj["location"]["name"] = data.place;
        obj["location"]["foursquareId"] = data.placeId;
        obj["location"]["lat"] = data.lat;
        obj["location"]["long"] = data.long;
        obj["location"]["street"] = data.address;
        obj["location"]["city"] = data.city;
        obj["location"]["country"] = data.country;
        obj["location"]["phone"] = data.phone;
        obj["location"]["postalCode"] = data.postalCode;
        obj["location"]["state"] = data.state;
        obj["location"]["twitterId"] = data.twitterId;
        obj["location"]["siteUrl"] = data.siteUrl;
        obj["source"]["name"] = data.source;
        obj["source"]["deviceId"] = data.deviceId;
        obj["category"]["name"] = data.categoryName;
        obj["name"] = items[i];
        // instantiate item
        console.log(obj);
        var item = new Item.model(obj);
        // // save item
        item.save(function(err) {
            if (err) return res.apiError('error', err);
        });
      }
    }
    else {
      var obj = {};
      obj["location"] = {};
      obj["category"] = {};
      obj["source"] = {};
      obj["location"]["name"] = data.place;
      obj["location"]["foursquareId"] = data.placeId;
      obj["location"]["lat"] = data.lat;
      obj["location"]["long"] = data.long;
      obj["location"]["street"] = data.address;
      obj["location"]["city"] = data.city;
      obj["location"]["country"] = data.country;
      obj["location"]["phone"] = data.phone;
      obj["location"]["postalCode"] = data.postalCode;
      obj["location"]["state"] = data.state;
      obj["location"]["twitterId"] = data.twitterId;
      obj["location"]["siteUrl"] = data.siteUrl;
      obj["source"]["name"] = data.source;
      obj["source"]["deviceId"] = data.deviceId;
      obj["category"]["name"] = data.categoryName;
      obj['name'] = data['itemName'];
      var item = new Item.model(obj);
      item.save(function(err) {
          if (err) return res.apiError('error', err);
      });
    }

    // item has been saved
    res.apiResponse({
      post: 'items have been saved'
    });

  }
  else {
    TopThings.model.find({}, function(err, items) {
      if (err) throw err;
      // all the items
      res.json({items: items});
    });
  }

}
