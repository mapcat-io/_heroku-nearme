var keystone = require('keystone'),
    mongoose = require('mongoose');

var Item = keystone.list('Item');

NewItem.model.find().forEach( function(doc) {
  var coords = {
    "type": "Point",
    "coordinates": [doc.location.long, doc.location.lat]
  };
  doc.location.coords = coords;
  console.log(doc);
  // doc.save();
});
