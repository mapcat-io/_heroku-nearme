var keystone = require('keystone');
var Item = keystone.list('Item');

exports = module.exports = function(req, res) {
  var key =  req.query.key || '';

  if (key === 'secret') {

    var stream = Item.model.find().stream();

    stream.on('data', function (streamDoc) {
      // do something with the mongoose document
      var id = streamDoc._id;
      var coords = {
        "type": "Point",
        "coordinates": [streamDoc.location.long, streamDoc.location.lat]
      };
      console.log(coords);
      Item.model.findById(id, function (err, doc) {
        if (err) return handleError(err);
        doc.coords = coords;
        doc.save(function (err, updatedDoc) {
          if (err) return handleError(err);
          // console.log(updatedDoc);
        });
      });
    }).on('error', function (err) {
      // handle the error
      console.log(err);
      res.json({item: error});
    }).on('close', function () {
      // the stream is closed
      console.log('Stream Closed');
      res.json({item: 'Strem Closed'});

    });
  } else {
    res.json({item: 'no key defined'});
  }
}
