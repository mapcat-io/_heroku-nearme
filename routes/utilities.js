var _ = require('lodash');

module.exports = {
  // return fulll url from express req object
  fullUrl: function(req) {
    url = require('url');
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    });
  },
  // general server side universal analytics
  analyticsEventAPI: function(category, action, label, value, deviceId) {
    var ua = require('universal-analytics');
    // universal-analytics ID
    if (userId) {
      var visitor = ua('UA-77560033-1', deviceId); // Mapcat GA ID with user ios deviceId
    }
    else {
      var visitor = ua('UA-77560033-1'); // Mapcat GA ID
    }
    // if label is req object, parse into full url
    if (label.socket) {
      label = this.fullUrl(label);
    };
    visitor.event(category, action, label, 1).send();
  },
  // process things results for ios app
  spewEngine: function(docs) {
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
