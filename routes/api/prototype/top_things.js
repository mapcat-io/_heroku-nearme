var keystone = require('keystone'),
    async = require('async'),
		ItemsPrototype = keystone.list('ItemsPrototype');

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  var data = (req.method == 'POST') ? req.body : req.query;
  var items = data['itemName'];
  console.log(data);

  if (Array.isArray(items)) {
    for (var i = 0; i < items.length; i++) {
      // create item data
      var obj = {};
      obj["place"] = data.place;
      obj["placeId"] = data.placeId;
      obj["lat"] = data.lat;
      obj["long"] = data.long;
      obj["name"] = items[i];
      // instantiate item
      var item = new ItemsPrototype.model(obj);
      // // save item
      item.save(function(err) {
          if (err) return res.apiError('error', err);
      });
    }
  }
  else {
    var obj = {};
    obj["place"] = data.place;
    obj["placeId"] = data.placeId;
    obj["lat"] = data.lat;
    obj["long"] = data.long;
    obj['name'] = data['itemName'];
    var item = new ItemsPrototype.model(obj);
    item.save(function(err) {
        if (err) return res.apiError('error', err);
    });
  }

  // item has been saved
  res.apiResponse({
    post: 'items have been saved'
  });

}
