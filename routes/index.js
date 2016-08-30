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
	api_prototype: importRoutes('./api/prototype'),
	api_v1: importRoutes('./api/v1'),
	site: importRoutes('./site'),
	login: importRoutes('./tool'),
	ios: importRoutes('./ios'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
	// Views

	//= Site
	app.get('/', routes.site.index);
	app.get('/login', routes.views.index);
	app.get('/search', routes.views.search);
	app.get('/thing/:id', routes.views.thing);
	app.get('/place/:id', routes.views.place);
	app.get('/merchants', routes.site.merchants);

	//= Mapcat Tool
	app.get('/tool/home', routes.login.index);
	app.get('/tool/places', routes.login.places);
	app.all('/tool/place/:id', routes.login.place_item_list);

	//= V2
	app.get('/api/v2/items', routes.api_v2.items); // ios app retrieves from here
	app.get('/api/v2/geoitems', routes.api_v2.geoitems); // new proposed query (for performance)
	app.get('/api/v2/items-in-place', routes.api_v2.items_in_place); // ios app retrieves from here
	app.get('/api/v2/item', routes.api_v2.item);
	app.get('/api/v2/item-stats', routes.api_v2.item_stats);
	app.get('/api/v2/place-stats', routes.api_v2.place_stats);
	app.all('/api/v2/post-items', keystone.middleware.api, keystone.middleware.cors, routes.api_v2.post_items); // ios app posts to here
	app.get('/api/v2/places', routes.api_v2.places);
	app.all('/api/v2/top-things', keystone.middleware.api, routes.api_v2.top_things);

	//= API PROTOTYPE (DEPRECATED)
	app.get('/api/prototype/things', routes.api_prototype.things); // old url
	app.get('/api/prototype/items', routes.api_prototype.items); // ios app retrieves from here
	app.get('/api/prototype/item-stats', routes.api_prototype.item_stats);
	app.all('/api/prototype/post-items', keystone.middleware.api, keystone.middleware.cors, routes.api_prototype.post_items); // ios app posts to here
	app.get('/api/prototype/places', routes.api_prototype.places);
	app.all('/api/prototype/top-things', keystone.middleware.api, routes.api_prototype.top_things);

	//= iOS webviews (DEPRECATED)
	app.all('/ios/place/:id', routes.ios.ios_item_list);


	//= API V1 (DEPRECATED)
	app.get('/api/v1', routes.api_v1.index);
	app.get('/api/v1/things', routes.api_v1.things);
	app.get('/api/v1/thing/:id', routes.api_v1.thing);
	app.get('/api/v1/place/:id', routes.api_v1.place);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);


};
