// mongo ds149175-a0.mlab.com:49175/heroku_0dg6nvlh -u heroku_prod -p k4T2tFOci9

db.items.find().forEach( function(doc) {
  var coords = {
    "type": "Point",
    "coordinates": [doc.location.long, doc.location.lat]
  };
  var id = doc._id.str;
  db.newitems.update(
   { _id: id },
   { $set: { "location.coords": coords } }
 );
});
