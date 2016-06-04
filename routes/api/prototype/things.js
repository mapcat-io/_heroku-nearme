var mongojs = require('mongojs');

// define db connection credentials
var db = mongojs('mongodb://rustyritz:J3nnifer@ds029224.mlab.com:29224/heroku_qtmrm6hs', ['things_prototype']);
var things = db.collection('things_prototype');

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  var q = req.query.q || '';

  things.find({ $or: [
      {"Thing": { "$regex": q, "$options": "i" }},
      {"Common name": { "$regex": q, "$options": "i" }},
      {"SuperThing": { "$regex": q, "$options": "i" }},
      {"Brand": { "$regex": q, "$options": "i" }},
      {"Category": { "$regex": q, "$options": "i" }},
      {"Description": { "$regex": q, "$options": "i" }},
      {"Tags": { "$regex": q, "$options": "i" }},
      {"Place name": { "$regex": q, "$options": "i" }}
    ]}, function (err, docs) {
      // docs is an array of all the documents in the collection
      console.log(docs);
      if (err) throw err;
      // all the things
      res.json({things: docs});
  });

}
