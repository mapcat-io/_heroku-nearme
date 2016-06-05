var _ = require('lodash');

module.exports = {

  spewEngine: function(docs) {
    //console.log(docs);

    var arr = [];
    var unique = {};
    docs.forEach(function(doc, i) {
        // dedup similar things within places
        unique[doc["Place name"]] = unique[doc["Place name"]] || {
          "thing": [],
          "lat": '',
          "long": '',
          "description": '',
          "street": ''
        };
        // things
        unique[doc["Place name"]].thing.push(doc["Thing"]);
        // lat
        if (unique[doc["Place name"]].lat == '') {
          unique[doc["Place name"]].lat = doc["Latitude"];
        }
        // long
        if (unique[doc["Place name"]].long == '') {
          unique[doc["Place name"]].long = doc["Longitude"];
        }
        // description
        if (unique[doc["Place name"]].description == '') {
          unique[doc["Place name"]].description = doc["Description"];
        }
        // street
        if (unique[doc["Place name"]].street == '') {
          unique[doc["Place name"]].street = doc["Street"];
        }

    });

    unique = Object.keys(unique).map(function (key, i) {
        return {
          "place": key,
          "thing": unique[key].thing.join(", "),
          "lat": unique[key].lat,
          "long": unique[key].long,
          "description": unique[key].description,
          "street": unique[key].street

        };
    });

    return unique
  }

};
