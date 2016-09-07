var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');

var cache = cacheManager.caching({
    store: redisStore,
    host: 'localhost', // default value
    port: 6379, // default value
   // auth_pass: 'XXXXX',
    db: 0,
    ttl: 600
});


module.exports = cache;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
