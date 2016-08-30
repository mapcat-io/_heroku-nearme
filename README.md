# Mapact Primary Web Application

Mapcat Company Site Node.js deployment. 

Live site: [www.mapcat.io](http://www.mapcat.io/)

## Relevant Documentation Pages

*	[Keystone](http://keystonejs.com/docs/database/)
*	[Express](http://expressjs.com/)
*	[Mongoose](http://mongoosejs.com/)
*	[Node](https://nodejs.org/en/)
*	[Heroku + Node](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## Installation

### Global Dependencies

*   [Node](https://nodejs.org/en/) -- `brew install node`
*   [Grunt](http://gruntjs.com/) -- `npm install -g grunt`

### Local Dependencies

To install the local dependencies, clone the repo (install the global dependencies) and in the root directory, run `npm install`.

### Environment variables

In order to run the local server, you'll need to set a few environment variables. This is done by creating a new file called `.env` in the root directory of the project. Add the values for the following required global variables.

    COOKIE_SECRET=[COOKIE_SECRET]

    MONGO_URI=mongodb://[MLAB_URI]

For quick development, we use a shared cloud-based version of MongoDB. However, by setting the `MONGO_URI` here you are able to point to any MongoDB instance.

## Usage

### Local Server

To run the local server, in the root directory, run `node keystone.js`

With the server running, checkout out a few jumping off points:

*   `localhost:3000/` Example form implementation for Community Edition Signup
*   `http://localhost:3000/api/v2/items?q=beer&t=aggregate` API endpoint for items

If you'd like to create an account, contact `ryang24@gmail.com`.

### Grunt Commands

There are several grunt commands to make developing on the system easier. You can run the following commands in the root directory:

*   `grunt watch` will listen to changes matching `/templates/**/*.hbs`, `/public/styles/**/*.scss` and compile the code as needed (either for email or server processing). 

For more information around the available grunt commands, look at `Gruntfile.js` and the folder `grunt`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
