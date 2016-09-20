var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');

// format: redis://[:password@]host[:port][/db-number][?ttl=value]
var redisUrl = process.env.REDISTOGO_URL + 0 + '?ttl=' + process.env.REDISTOGO_TTL

var cache = cacheManager.caching({
    store: redisStore,
    url: redisUrl
});

module.exports = cache;
module.exports.stream = {
    write: function(message, encoding){
      logger.info(message);
    }
};
