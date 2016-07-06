var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities');

exports = module.exports = function(req, res) {
  var q = req.query.q.trim() || '', // search term
      t = req.query.t || ''; // raw result

  // regex to match word starts with q
  q = '\\b' + q + '\\S*';

  Item.model.find().sort('-updatedAt').find({ $or: [
      // fields to check for the search
      {"name": { "$regex": q, "$options": "i" }},
      {"description": { "$regex": q, "$options": "i" }},
      {"category.name": { "$regex": q, "$options": "i" }},
      {"location.name": { "$regex": q, "$options": "i" }},
      {"location.categoryName": { "$regex": q, "$options": "i" }},
      {"location.categoryYelp": { "$regex": q, "$options": "i" }},
    ]}, function(err, items) {
    if (err) throw err;
    // google analytics
    utilities.analyticsEventAPI('api', 'search', req, 1);
    // all the items
    res.json({items: items});
  });

}


// populates csv dump into 'test' collection
// exports = module.exports = function(req, res) {
//
//   items.find({ $or: [
//       {"name": { "$regex": q, "$options": "i" }},
//       // {"Common name": { "$regex": q, "$options": "i" }},
//       // {"SuperThing": { "$regex": q, "$options": "i" }},
//       // {"Brand": { "$regex": q, "$options": "i" }},
//       // {"Category": { "$regex": q, "$options": "i" }},
//       {"description": { "$regex": q, "$options": "i" }},
//       // {"Tags": { "$regex": q, "$options": "i" }},
//       // {"Place name": { "$regex": q, "$options": "i" }}
//     ]}, function (err, docs) {
//       // docs is an array of all the documents in the collection
//       if (t === 'raw') {
//           result = docs;
//       }
//       else {
//         result = utilities.spewEngine(docs);
//       }
//       if (err) throw err;
//       // send event to universal-analytics
//       utilities.analyticsEventAPI('api', 'search', req, 1);
//       //visitor.event("api", "search", fullUrl(req), 1).send();
//       // all the things
//       res.json({items: result});
//   });
//
// }
