const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const hbs = require('handlebars');
const haj = require('hapi-auth-jwt2');
require('env2')('./config.env');

const validate = (token, request, callback) => {
  console.log('Validating');
  console.log(token);
  if (token.status === 'loggedIn') {
    return callback(null, true);
  }
  return callback(null, false);
};


const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([inert, vision, haj], (error) => {
  if (error) throw error;

  server.views({
    engines: {
      hbs
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layout',
    layout: 'default'
  });
  server.auth.strategy('jwt-strategy', 'jwt', {
    key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route(routes);
});

module.exports = server;
