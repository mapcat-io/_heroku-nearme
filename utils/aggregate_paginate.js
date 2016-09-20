'use scrict'

var async = require('async'),
    keystone = require('keystone'),
    Item = keystone.list('Item'),
    logger = require("./logger");

function aggregate_paginate (model,aggregate, options, callback) {
  options = options || {};
  var pageNumber = parseInt(options.page || 1, 10);
  var resultsPerPage = parseInt(options.limit || 10, 10);
  var skipDocuments = (pageNumber - 1) * resultsPerPage;
  var sortBy = options.sortBy;
  var isCount = parseInt(options.iscount || 0);

  var q = model.aggregate(aggregate._pipeline);
  var countQuery = model.aggregate(q._pipeline);

  if (sortBy) {
    q.sort(sortBy);
  }

  async.parallel({
    results: function (callback) {
      q.skip(skipDocuments)
        .limit(resultsPerPage)
        .exec(callback);
    },
    count: function (callback) {
      countQuery.group({ _id: null, count: { $sum: 1 } })
        .exec(function (err, result) {
          if (err) { callback(err) ;} else {
            callback(null, result.length === 0 ? 0 : result[0].count);
          }
        });
    }
  }, function (error, data) {
    if (error) {
      return callback(error);
    }
    callback(null, data.results, Math.ceil(data.count / resultsPerPage) || 1, data.count);
  });
}

module.exports = aggregate_paginate;
