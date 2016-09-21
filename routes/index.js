/**
* This file is where you define your application routes and controllers.
*
* Start by including the middleware you want to run for every request;
* you can attach middleware to the pre('routes') and pre('render') events.
*
* For simplicity, the default setup for route controllers is for each to be
* in its own file, and we import all the files in the /routes/views directory.
*
* Each of these files is a route controller, and is responsible for all the
* processing that needs to happen for the route (e.g. loading data, handling
* form submissions, rendering the view template, etc).
*
* Bind each route pattern your application should respond to in the function
* that is exported from this module, following the examples below.
*
* See the Express application routing documentation for more information:
* http://expressjs.com/api.html#app.VERB
*/

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api_v2: importRoutes('./api/v2'),
  site: importRoutes('./site')
};

// Setup Route Bindings
exports = module.exports = function(app) {
  // Views
  //= Site
  app.get('/', routes.site.index);
  app.get('/login', routes.views.index);
  app.get('/merchants', routes.site.merchants);
  app.get('/terms', routes.site.terms);
  app.get('/privacy', routes.site.privacy);
  app.get('/faq', routes.site.faq);

  //= V2
  // app.get('/api/v2/items', routes.api_v2.items); // ios prod app retrieves from here
  // app.get('/api/v2/geonear-items', routes.api_v2.geonear_items); // geonear query
  // app.get('/api/v2/geonear-raw-items', routes.api_v2.geonear_raw_items); // geonear query without pagination
  //
  // app.get('/api/v2/items-in-place', routes.api_v2.items_in_place); // ios app retrieves from here
  // app.get('/api/v2/item', routes.api_v2.item);
  // app.get('/api/v2/item-stats', routes.api_v2.item_stats);
  // app.get('/api/v2/place-stats', routes.api_v2.place_stats);
  // app.all('/api/v2/post-items', keystone.middleware.api, keystone.middleware.cors, routes.api_v2.post_items); // ios app posts to here
  // app.get('/api/v2/places', routes.api_v2.places);
  // app.all('/api/v2/top-things', keystone.middleware.api, routes.api_v2.top_things);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);


};
