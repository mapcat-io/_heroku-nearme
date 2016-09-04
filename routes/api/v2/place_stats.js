var keystone = require('keystone'),
    Item = keystone.list('Item'),
    utilities = require('../../utilities'),
    logger = require("../../../utils/logger"),
    aggregate_paginator = require("../../../utils/aggregate_paginate");

exports = module.exports = function(req, res) {

    var u = req.query.u || '', // ios deviceId
        t = req.query.t || '';

    // individual user stats
    var aggregateQuery = Item.model.aggregate({
        $group : {// "$addToSet" pushes only unique values
            _id : null,
            "places" : {
                "$addToSet" : "$location.name"
            },
        }
    });

    var queryOptions = {
        page : req.query.page || 1,
        limit : 10
    };

    aggregate_paginator(Item.model, aggregateQuery, queryOptions, function(err, items, pageCount, count) {
        if (err)
            throw err;
        // google analytics
        utilities.analyticsEventAPI('api', 'search', req, 1, u);
        // all the items
        res.json({
            items : items
        });
    });

};
