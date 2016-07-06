var mongojs = require('mongojs'),
    utilities = require('../../utilities');

// define db connection credentials
var db = mongojs(process.env.MONGOLAB_URI, ['items']);
var items = db.collection('items');

// populates csv dump into 'test' collection
exports = module.exports = function(req, res) {

  var q = req.query.q || '',
      t = req.query.t || '';

  var result = [],
      // regex to match word starts with q
      q = '\\b' + q + '\\S*';

  items.find({ $or: [
      {"name": { "$regex": q, "$options": "i" }},
      // {"Common name": { "$regex": q, "$options": "i" }},
      // {"SuperThing": { "$regex": q, "$options": "i" }},
      // {"Brand": { "$regex": q, "$options": "i" }},
      // {"Category": { "$regex": q, "$options": "i" }},
      {"description": { "$regex": q, "$options": "i" }},
      // {"Tags": { "$regex": q, "$options": "i" }},
      // {"Place name": { "$regex": q, "$options": "i" }}
    ]}, function (err, docs) {
      // docs is an array of all the documents in the collection
      if (t === 'raw') {
          result = docs;
      }
      else {
        result = utilities.spewEngine(docs);
      }
      if (err) throw err;
      // send event to universal-analytics
      utilities.analyticsEventAPI('api', 'search', req, 1);
      //visitor.event("api", "search", fullUrl(req), 1).send();
      // all the things
      res.json({items: result});
  });

}
